let table_appoinments = document.getElementById('table_appoinments');

window.onload = async () => {
    const { data, error } = await client
    .from('abc')
    .select('name,age,number,gender,condition,status')
    if (error) {
        console.log(error.message);
    }else{
        console.log(data);
        
        table_appoinments.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
            table_appoinments.innerHTML += `
        <tr>
            <td>PT${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].age}</td>
            <td>${data[i].gender}</td>
            <td>${data[i].number}</td>
            <td>${data[i].condition}</td>
            <td>${data[i].status}</td>
            <td><a href="" class="action-link">View Details</a></td>
        </tr>
    `
        }
    }
}