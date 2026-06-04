const drName = document.querySelectorAll('.dr_name');
const avator = document.querySelectorAll('.avatar');
const appoinments =document.getElementById('appoinments');
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const revenueCtx = document.getElementById("revenueChart");

// Sidebar Toggle
if(menuBtn){
    menuBtn.addEventListener("click", ()=>{
        sidebar.classList.toggle("show");
    });
}

// Revenue Chart
if(revenueCtx){
new Chart(revenueCtx, {

    type: "line",
    data: {

        labels: ["Jan","Feb","Mar","Apr","May","Jun"],
        datasets: [{
            label: "Revenue",
            data: [25000,35000,28000,45000,52000,68000],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,.15)",
            fill: true,
            tension: .4,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "#eef2f7"
                }
            },

            x: {
                grid: {
                    display: false
                }
            }
        }
    }

});

}


// Appointment Chart
const appointmentCtx =
document.getElementById("appointmentChart");

if(appointmentCtx){

new Chart(appointmentCtx, {

    type: "doughnut",

    data: {

        labels: [
            "Confirmed",
            "Pending",
            "Cancelled"
        ],

        datasets: [{

            data: [65,25,10],
            backgroundColor: [

                "#2563eb",
                "#f59e0b",
                "#ef4444"

            ],

            borderWidth: 0

        }]
    },

    options: {

        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }

});

}


// Close Sidebar On Mobile
document.addEventListener("click", function(e){

    if(
        window.innerWidth < 992 &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ){
        sidebar.classList.remove("show");
    }

});

window.onload = async () => {
    const { data, error } = await client.auth.getSession();
    if (error) {
        console.log(error.message);
    }else{
        let user_id = data.session.user.user_metadata.full_name;

        // Name display
        drName.forEach(element => {
            element.innerText = `Dr. ${user_id}`;
        });

        //Letter Display
        const initials = user_id
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
        
        avator.forEach(el => el.innerText = initials);
    }
}

window.addEventListener('load', async () => {
    // 1. Pehle logged-in user (doctor) ka session aur naam lein
    const { data: authData, error: authError } = await client.auth.getSession();
    
    if (authError || !authData.session) {
        console.log("User logged in nahi hai ya error hai:", authError?.message);
        return; 
    }

    // Doctor ka full name user metadata se nikalna
    let doctorFullName = authData.session.user.user_metadata.full_name;    

    // UI par doctor ka naam display karna
    drName.forEach(element => {
        element.innerText = `Dr. ${doctorFullName}`;
    });

    // 2. Ab appointments ka data fetch karein aur sirf is doctor par FILTER karein
    // Doctor ke naam se agar "Dr. " shuru mein likha ho toh usay saaf karlein (sirf "Sabir" bache)
    let cleanDoctorName = doctorFullName.replace(/^Dr\.\s*/i, '').trim();

    // Ab .ilike ke zariye query karein
    const { data: appointmentData, error: appointmentError } = await client
    .from('appoinmentForm')
    .select('name, doctor, time')
    .ilike('doctor', `%${cleanDoctorName}%`); // Yeh "Dr. Sabir (Chest Specialist)" ko dhoond nikalega

    if (appointmentError) {
        console.log("Appointments fetch karne mein error:", appointmentError.message);
    } else {
        console.log("Filtered Appointments:", appointmentData);

        // UI table ko khali karna taaki purana data clear ho jaye (optional but good practice)
        if(appoinments) appoinments.innerHTML = '';

        // Loop chalakar data table mein show karna
        for (let i = 0; i < appointmentData.length; i++) {
            // Agar doctor column mein brackets hain (e.g. "Dr. Ali (Cardiologist)"), toh unhe clean karna
            const doctorName = appointmentData[i].doctor.replace(/\s*\(.*?\)\s*/g, '');

            // Time ko 12-hour format mein convert karna
            const time12 = new Date(`1970-01-01T${appointmentData[i].time}`)
                .toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });

            // Table rows insert karna
            appoinments.innerHTML += `
                <tr>
                    <td>${appointmentData[i].name}</td>
                    <td>${doctorName}</td>
                    <td>${time12}</td>
                    <td><span class="badge bg-warning">Confirmed</span></td>
                </tr>
            `;
        }
    }
});

document.getElementById('logout').addEventListener('click', async () => {
    const { error } = await client.auth.signOut({ scope: 'local' })
    console.log(error.message);
    window.location.href = './index.html'
    
})



// const drName = document.querySelectorAll('.dr_name');
// const avator = document.querySelectorAll('.avatar');
// const appoinments = document.getElementById('appoinments');
// const menuBtn = document.querySelector(".menu-btn");
// const sidebar = document.querySelector(".sidebar");
// const revenueCtx = document.getElementById("revenueChart");
// const appointmentCtx = document.getElementById("appointmentChart");

// // Sidebar Toggle
// if (menuBtn) {
//     menuBtn.addEventListener("click", () => {
//         sidebar.classList.toggle("show");
//     });
// }

// // Revenue Chart
// if (revenueCtx) {
//     new Chart(revenueCtx, {
//         type: "line",
//         data: {
//             labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//             datasets: [{
//                 label: "Revenue",
//                 data: [25000, 35000, 28000, 45000, 52000, 68000],
//                 borderColor: "#2563eb",
//                 backgroundColor: "rgba(37,99,235,.15)",
//                 fill: true,
//                 tension: .4,
//                 pointRadius: 5,
//                 pointHoverRadius: 7
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//                 legend: { display: false }
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     grid: { color: "#eef2f7" }
//                 },
//                 x: {
//                     grid: { display: false }
//                 }
//             }
//         }
//     });
// }

// // Appointment Chart
// if (appointmentCtx) {
//     new Chart(appointmentCtx, {
//         type: "doughnut",
//         data: {
//             labels: ["Confirmed", "Pending", "Cancelled"],
//             datasets: [{
//                 data: [65, 25, 10],
//                 backgroundColor: ["#2563eb", "#f59e0b", "#ef4444"],
//                 borderWidth: 0
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             cutout: "70%",
//             plugins: {
//                 legend: { position: "bottom" }
//             }
//         }
//     });
// }

// // Close Sidebar On Mobile Clicking Outside
// document.addEventListener("click", function (e) {
//     if (
//         sidebar && menuBtn &&
//         window.innerWidth < 992 &&
//         !sidebar.contains(e.target) &&
//         !menuBtn.contains(e.target)
//     ) {
//         sidebar.classList.remove("show");
//     }
// });

// // App Initialization: Auth Verification & Data Fetching
// window.addEventListener('DOMContentLoaded', async () => {
//     // 1. Secure Route Check
//     const { data: authData, error: authError } = await client.auth.getSession();
    
//     if (authError || !authData || !authData.session) {
//         console.log(authError ? authError.message : "No active session. Redirecting...");
//         window.location.href = './index.html';
//         return; // Stop execution if unauthenticated
//     }

//     console.log("Authenticated session data:", authData);
//     let user_id = authData.session.user.user_metadata.full_name;
//     console.log(user_id);
    
//     // 2. Display Profile Information
//     drName.forEach(element => {
//         element.innerText = `Dr. ${user_id}`;
//     });

//     // const initials = user_id
//     //     .split(" ")
//     //     .map(word => word[0])
//     //     .join("")
//     //     .toUpperCase();
    
//     // avator.forEach(el => el.innerText = initials);

//     // 3. Fetch & Render Table Data
//     const { data: appointmentsData, error: dbError } = await client
//         .from('appoinmentForm')
//         .select('name, doctor, time');

//     if (dbError) {
//         console.log("Database error:", dbError.message);
//     } else if (appointmentsData && appoinments) {
//         console.log("Appointments fetched:", appointmentsData);
        
//         let rowsHtml = "";
//         for (let i = 0; i < appointmentsData.length; i++) {
//             const doctorName = appointmentsData[i].doctor.replace(/\s*\(.*?\)\s*/g, '');

//             // Convert Time to 12-hour format safely
//             const time12 = new Date(`1970-01-01T${appointmentsData[i].time}`)
//                 .toLocaleTimeString('en-US', {
//                     hour: 'numeric',
//                     minute: '2-digit',
//                     hour12: true
//                 });

//             rowsHtml += `
//                 <tr>
//                     <td>${appointmentsData[i].name}</td>
//                     <td>${doctorName}</td>
//                     <td>${time12}</td>
//                     <td><span class="badge bg-warning">Confirmed</span></td>
//                 </tr>
//             `;
//         }
//         appoinments.innerHTML = rowsHtml;
//     }
// });


// // Logout Event Listener (Fixed crash issue)
// const logoutBtn = document.getElementById('logout');
// if (logoutBtn) {
//     logoutBtn.addEventListener('click', async () => {
//         const { error } = await client.auth.signOut({ scope: 'local' });
//         if (error) {
//             console.log("Logout error:", error.message);
//         }
//         window.location.href = './index.html';
//     });
// }