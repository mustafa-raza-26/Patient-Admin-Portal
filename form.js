// let nameAp = document.getElementById('nameAp');
// let emailAp = document.getElementById('emailAp');
// let numberAp = document.getElementById('num');
// let age = document.getElementById('age');
// let date = document.getElementById('date');
// let gender = document.getElementById('gender');
// let reason = document.getElementById('reason');
// let doctor = document.getElementById('doctor');
// let submit = document.getElementById('submit');

// window.addEventListener('load', async () => {
//     const { data, error } = await client
//     .from('Admin_Portal_User')
//     .select('name,specialty')
//     if (error) {
//         console.log('error', error.message);
//         alert('error', error.message);
//     }else{

//         for (let i = 0; i < data.length; i++) {
//             doctor.innerHTML +=`
//                 <option>Dr. ${data[i].name}&emsp;(${data[i].specialty})</option>
//             `
//         }
//     }
// });

// if (submit) {
//     submit.addEventListener('click', async () =>{
//         // let ntime = formatTime(time.value)
//         const { error } = await client
//         .from('patientData')
//         .insert({
//             patient_Name:nameAp.value,
//             email:emailAp.value,
//             contact_No:numberAp.value,
//             age:age.value,
//             date_time:date.value,
//             gender:gender.value,
//             reason:reason.value,
//             doctor_Name:doctor.value
//         })
//         if (error) {
//             console.log('error', error.message);
//             alert('error', error.message);
//         }else{
//             console.log('Your Form is Submit');
//             alert('Your Form is Submit');
//             // window.location.href = 'https://mustafa-raza-26.github.io/Final-Test/appoinment.html'
//             window.location.href = './appoinment.html'
//         }

//         nameAp.value = ''
//         emailAp.value = ''
//         numberAp.value = ''
//         age.value = ''
//         nameAp.value = ''
//         gender.value = ''
//         reason.value = ''
//         doctor.value = ''
        
    
//     })
// }

// function formatTime(time) {
//     let [hour, minute] = time.split(":");
//     hour = parseInt(hour);

//     let ampm = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12 || 12;

//     return `${hour}:${minute} ${ampm}`;
// }
let nameAp = document.getElementById('nameAp');
let emailAp = document.getElementById('emailAp');
let numberAp = document.getElementById('num');
let age = document.getElementById('age');
let date = document.getElementById('date');
let gender = document.getElementById('gender');
let reason = document.getElementById('reason');
let doctor = document.getElementById('doctor');
let submit = document.getElementById('submit');

window.addEventListener('load', async () => {
    // 1. Check if the doctor element exists on this page first
    if (!doctor) return; 

    const { data, error } = await client
    .from('Admin_Portal_User')
    .select('name,specialty');
    
    if (error) {
        console.log('error', error.message);
        alert('error: ' + error.message);
    } else {
        for (let i = 0; i < data.length; i++) {
            doctor.innerHTML += `
                <option>Dr. ${data[i].name}&emsp;(${data[i].specialty})</option>
            `;
        }
    }
});

if (submit) {
    submit.addEventListener('click', async () => {
        // 1. Get current logged in user to link their ID
        const { data: { user } } = await client.auth.getUser();
        if (!user) {
            alert('You must be logged in to book an appointment!');
            return;
        }

        // 2. Insert into database using your correct column names
        const { error } = await client
        .from('patientData')
        .insert({
            user_id: user.id, // Linked user
            patient_Name: nameAp.value,
            email: emailAp.value,
            contact_No: numberAp.value,
            age: age.value,
            date_time: date.value, // Note: standard datetime string from input type="datetime-local" works great
            gender: gender.value,
            reason: reason.value,
            doctor_Name: doctor.value
        });

        if (error) {
            console.log('error', error.message);
            alert('error: ' + error.message);
        } else {
            alert('Your Form is Submitted');
            window.location.href = './appoinment.html';
        }

        // Reset fields safely
        nameAp.value = '';
        emailAp.value = '';
        numberAp.value = '';
        age.value = '';
        gender.value = '';
        reason.value = '';
        doctor.value = '';
    });
}