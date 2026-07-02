let card = document.getElementById('card');

async function fetchAppointments() {
  const { data: { user } } = await client.auth.getUser();
  
  if (!user) {
    console.log('Login required');
    return;
  }

  const { data, error } = await client
    .from('patientData')
    .select('*')
    .eq('auth_id', user.id);

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  card.innerHTML = "";

  if (!data || data.length === 0) {
    card.innerHTML = `
      <div class="text-center mt-5 p-1">
        <h4>You don't have any appointments</h4>
      </div>
    `;
    return;
  }

  for (let i = 0; i < data.length; i++) {
    // Handling date_time splitting safely assuming database saves standard timestamps or strings
    let fullDateTime = data[i].date_time || "";
    let displayDate = fullDateTime.split("T")[0] || fullDateTime; 
    let displayTime = fullDateTime.split("T")[1] ? formatTime(fullDateTime.split("T")[1]) : "N/A";

    card.innerHTML += `
      <div class="col-11 col-md-4 p-3 mb-3">
        <span class="d-flex"><h5 style="font-weight: bold;">Patient Name:</h5>&nbsp;<h5>${data[i].patient_Name}</h5></span>
        <span class="d-flex"><h5 style="font-weight: bold;">Patient ID:</h5>&nbsp;<h5>PT${data[i].id}</h5></span>
        <span class="d-flex"><h5 style="font-weight: bold;">Doctor Name:</h5>&nbsp;<h5>${data[i].doctor_Name}</h5></span>
        <span class="d-flex"><h5 style="font-weight: bold;">Date:</h5>&nbsp;<h5>${displayDate}</h5></span>
        <span class="d-flex"><h5 style="font-weight: bold;">Time:</h5>&nbsp;<h5>${displayTime}</h5></span>
        <span class="d-flex"><h5 style="font-weight: bold;">Reason:</h5>&nbsp;<h5>${data[i].reason}</h5></span>

        <button class="col-6 col-md-4 deleteBtn mt-2" data-id="${data[i].id}">
          Cancel
        </button>
      </div>
    `;
  }
}

if (card) {
  card.addEventListener('click', async (e) => {
    if (e.target.classList.contains('deleteBtn')) {
      const appointmentId = e.target.dataset.id;
      const confirmDelete = confirm("Are you sure you want to cancel this appointment?");

      if (!confirmDelete) return;

      // FIXED: Targeted 'patientData' instead of 'appoinmentForm'
      const { error } = await client
        .from('patientData') 
        .delete()
        .eq('id', appointmentId);

      if (error) {
        console.log('Delete error:', error.message);
      } else {
        fetchAppointments();
      }
    }
  });
}

// Format raw 24hr time (e.g., "14:30") to 12hr AM/PM format
function formatTime(time) {
    if (!time) return "N/A";
    let [hour, minute] = time.split(":");
    hour = parseInt(hour);

    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${hour}:${minute.substring(0, 2)} ${ampm}`;
}

fetchAppointments();