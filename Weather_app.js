const form = document.querySelector(".search-form")
const input = document.querySelector("#search-term")
const msg = document.querySelector(".msg")
const list = document.querySelector(".cities")

                    //  api key 
const apiKey =`e224cde4d237ef56dccd0b7c72b12600`



form.addEventListener("submit", (e) =>{
    e.preventDefault()

    msg.textContent = " "
    msg.classList.remove("visible")
    let inputval = input.value

    const listItemsArray= Array.from(list.querySelectorAll(".cities li"))

   
    if(listItemsArray.length > 0){
 
        const filterArray = listItemsArray.filter( el =>{
            let content =" "
            let cityName = el.querySelector(".city-name").textContent.toLowerCase()
            let cityCountry = el.querySelector(".city-country").textContent.toUpperCase()



            if(inputval.includes(',')){
            
                if(inputval.split(',')[1].length > 2){
                    inputval= input.split(",")[0]

                    content= cityName  

                }else{

                    content= `${cityName},${cityCountry}`
                }
                
            }else{

                content= cityName
            }

            return content == inputval.toLowerCase()
            
        })
        
        // console.log(filterArray)

         if( filterArray.length > 0){
             msg.textContent= `you already know the weather for${filterArray[0].querySelector(".city-name").textContent}
             ... otherwise be more specific by providing the country code as well`


             msg.classList.add("visible")

             form.reset()
             input.focus()

             return
         }
    }


                                     // AJAX MAGIC

     const url =  `http://api.openweathermap.org/data/2.5/weather?q=${inputval}&appid=${apiKey}&units=metric`                                                                                       

     fetch(url)
     .then( response => response.json())
     .then(data =>{

            console.log(data);

            if(data.cod == '404'){

                throw new Error(`${data.cod},${data.message}`)
            }

            const {main,name,sys,weather} = data

            // console.log(weather)

            const icon = `weather-images/weather/${weather[0]['icon']}.png`;

            // console.log(icon)

            const li = document.createElement("li")

                const markup=`
            <figure>
                <img src="${icon}"  alt="${weather[0]["drscription"]}">
            </figure>

            <div>
                <h2>${Math.round(main.temp)}<sup>*c</sup></h2>
                <p class="city-conditions">${weather[0]["description"].toUpperCase()}</p>
                <h3><span class="city-name">${name}</span><span class="city-country">${sys.country}</span></h3>
            </div>
        `   
            li.innerHTML= markup

            list.appendChild(li)
            
     })

     .catch(()=>{

         msg.textContent="please search for a valid city!"
         msg.classList.add("visible")
        
     })

     msg.textContent= " "
     form.reset()
     input.focus()
})

 