const supabaseURL = 'https://escflpzgeayghspqdkcr.supabase.co';
const supabaseKey = 'sb_publishable_X3l_oYzwfdLDEfOVXIwB2w_wcYfCBn2';
const client = supabase.createClient(supabaseURL,supabaseKey);
console.log(client);

let book = document.getElementById("book");
if(book){
    book.addEventListener("click", ()=>{

    client.auth.onAuthStateChange((event, session) => {
    if (!session) {
        alert('Sign up For Booking Appoinment');
    }else{
        window.location.href = './form.html'
        // window.location.href = 'https://mustafa-raza-26.github.io/Final-Test/form.html'
    }
    });
})
}