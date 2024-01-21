let CountryName="";
  //email

  emailjs.init('jIrzM7Xlc1FXQnePf');
 
  function SendMail() {
    console.log("enter");
      var params = {

          from_name: document.getElementById("fullName").value,
          user_email: document.getElementById("email_id").value,
          message: document.getElementById("message").value
      };
      console.log("here");
      emailjs.send("service_4wcbtnu", "template_hmfout5", params)
          .then(function (res) {
              alert("success" + res.status);
          });
  }
  // This function fetches news data and returns a promise
  var newsCountry = document.getElementById("newsCountry");
  function fetchNews(countrySymbol) {
    const apiKey = "5cb529ede76348a4ab853719ad55a2aa";
    const apiUrl = `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&source-countries=${countrySymbol}`;
  
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then(newsData => {
        console.log('News API Data:', newsData); // Log the API response for debugging
        return newsData.news || []; // Return the news array or an empty array if undefined
      })
      .catch(error => {
        console.error(`Error fetching news: ${error.message}`);
        return [];
      });
  }
  function formatData(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  
  
 
function sendEmail(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get your EmailJS service ID and template ID from the EmailJS dashboard
    const serviceID = 'service_4wcbtnu';
    const templateID = 'template_hmfout5';

    // Get the form data
    const formData = {
        from_name: document.getElementById("fullName").value,
        user_email: document.getElementById("email_id").value,
        message: document.getElementById("message").value
    };
    
    // Send the email using EmailJS
    emailjs.send(serviceID, templateID, formData)
        .then(response => {
            // Clear the form input fields
            document.getElementById("fullName").value = '';
            document.getElementById("email_id").value = '';
            document.getElementById("message").value = '';

            // Display success message in green
            let successMessage = document.getElementById("successMessage");
            successMessage.innerText = 'Email sent successfully!';
            successMessage.style.color = 'white';
            successMessage.style.backgroundColor = 'green';
            successMessage.style.opacity = .3;
            //successMessage.style.borderRadius = 10;

             // Hide the success message after 3 seconds (adjust the timeout value as needed)
             setTimeout(function() {
                successMessage.innerText = ''; // Clear the success message
                successMessage.style = '';
            }, 3000);
           
        })
        .catch(error => {
            console.error('Email failed to send:', error);
            alert('Error sending message. Please try again later.');
        });
}



// This function is already in your code, but I'm including it here for reference
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//Selected Country
document.addEventListener('DOMContentLoaded', function () {
    var countrySelect = document.getElementById('country');

    if (!countrySelect) {
        console.error('Element with id "country" not found in the DOM.');
        return;
    }
  
    // Fetch countries from the specified API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            // Add countries to the select element
            const defaultOption = document.createElement('option');
            defaultOption.text = 'Select Country';
            defaultOption.value = 'placeholder';
            countrySelect.appendChild(defaultOption);
            
            // Loop through the countries and create options for each
            countries.forEach(countryData => {
                const option = document.createElement('option');
                option.value = countryData.name.common;
                option.textContent = countryData.name.common;
                countrySelect.appendChild(option); // Append the option to the select element
            });
        })
        
        .catch(error => console.error('Error fetching countries:', error));
        hide=document.getElementById("hide");
        hide="";

        
      

      
      

//information depend on country
    countrySelect.addEventListener('change', function (event) {
        const selectedCountryCode = countrySelect.value;
        console.log(selectedCountryCode);
        CountryName=event.target.value;
        console.log(CountryName);
        var flag=document.getElementById("flag")
        var coat=document.getElementById("coat")
        var united=document.getElementById("united")
        var unitedTrue=document.getElementById("unitedTrue")
        var unitedFales=document.getElementById("unitedFales")
        var independentTrue=document.getElementById("independentTrue")
        var independentFalse=document.getElementById("independentFalse")

        var population=document.getElementById("population")
        var region=document.getElementById("region")
        var startOfWeek=document.getElementById("startOfWeek")
        var timeZone=document.getElementById("timeZone")
        var capital=document.getElementById("capital")
        
        
        // Fetch additional data for the selected country using another API
        fetch(`https://restcountries.com/v3.1/name/${CountryName}`)
            .then(response => response.json())
            .then(countryData => {
                flag.src=countryData[0].flags.png;
                coat.src=countryData[0].coatOfArms.png;
                var isUnited = countryData[0].unMember === true;
                var isIndependent = countryData[0].independent === true;

        if (isUnited) {
            unitedTrue.style.display = "inline-block";
            unitedFales.style.display = "none";
        } else {
            unitedTrue.style.display = "none";
            unitedFales.style.display = "inline-block";
        }

        if (isIndependent) {
            independentTrue.style.display = "inline-block";
            independentFalse.style.display = "none";
        } else {
            independentTrue.style.display = "none";
            independentFalse.style.display = "inline-block";
        }

          // Replace with your logic to get the country code
     //news
     let countrySymbol = countryData[0].cca2;

// Fetch news data and then update the UI

// Define truncateText globally
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
// Fetch news data and then update the UI
fetchNews(countrySymbol)
  .then(news => {
    console.log('API Response:', news);
    // Check if news is defined and not empty
    if (news && news.length > 0) {
      // Clear previous content if any
      newsCountry.innerHTML = '';

      // Iterate over news articles and update the UI
      news.forEach(newElement => {
        const imageUrl = newElement.image || 'author.jpg'; // Replace with your default image URL
        const formattedDate = formatData(newElement.publish_date); // Assuming formatData is defined
        const truncatedTitle = truncateText(newElement.title, 50); // Replace 50 with your desired title length
        const truncatedDescription = truncateText(newElement.text, 100); // Replace 100 with your desired description length
    
        //const imageUrl = newElement.image || 'https://images.app.goo.gl/uGwodTXsmrYcqcn9A'; // Replace with your default image URL
        newsCountry.innerHTML += `
          <div class="col-md-3 col-sm-6 my-3" style=" publish_date max-height: 600px; ">
            <div class="news-box" style="max-height: 600px; overflow: hidden;  ">
              <div class="new-thumb" style="height: 150px;">
                <span class="cat c1">Economy</span>
                <img class="w-100 " style="height: 100%;" src="${imageUrl}" alt="">
              </div>
              <div class="new-txt">
                <ul class="news-meta">
                  <li>${formattedDate}</li>
                </ul>
                <h6><a href="${newElement.title}">${truncatedTitle}</a></h6>
                <p>${truncatedDescription}</p>
              </div>
              <div class="news-box-f">
                <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt="">
                ${newElement.author.split(",")[0]}
                <a href="index.html#"><i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>`;
      });
    } else {
      console.error('News data is undefined or empty.');
    }
  })
  .catch(error => {
    console.error(`Error fetching news: ${error.message}`);
  });

//countryInfo
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
        population.textContent=countryData[0].population;
        var formattedPopulation = formatNumberWithCommas(countryData[0].population);
        population.textContent = formattedPopulation;
        region.textContent=countryData[0].region;
        startOfWeek.textContent=countryData[0].startOfWeek;
        capital.textContent=countryData[0].capital;
        timeZone.textContent=countryData[0].timezones;
   
//Map
var button = document.getElementById("button");
const apiKey1 = "AIzaSyDCCfoXSZoK3UBns2vOgqjxikkomxkSp6k"; // Replace with your API key
var countryName = selectedCountryCode;
const embeddedUrl = `https://www.google.com/maps?q=${countryName}&hl=en&z=6&output=embed`;
button.src = embeddedUrl;
console.log(button);
console.log(countryName);




    })


              // buttonMap
              var ShowMap=document.getElementById("ShowMap")
             /* function GoogleMap(countryName) {
                  const URL = `https://www.google.com/maps?q=${countryName}&hl=en&z=6`;
                  //ShowMap.href = URL;
                  window.open(URL, '_blank');
              }*/
              //var countryName = selectedCountryCode; // Replace with the actual country code
              ShowMap.addEventListener('click', function() {
                const URL = `https://www.google.com/maps?q=${CountryName}&hl=en&z=6`;
                //ShowMap.href = URL;
                window.open(URL, '_blank');
                 // GoogleMap(countryName);
              });
              
//show sections
            var CountryInfo=document.getElementById("CountryInfo")
            var Info=document.getElementById("Info")
            var Map=document.getElementById("Map")
            var CityNews=document.getElementById("CityNews")
            var Form=document.getElementById("Form")
            var footer=document.getElementById("footer")

            CountryInfo.style.display = "block";
            Info.style.display = "block";
            Map.style.display = "block";
            CityNews.style.display = "block";
            Form.style.display = "block";
            footer.style.display = "block";

           


})

});

;

