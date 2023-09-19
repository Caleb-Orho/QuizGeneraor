import React, { useState, useEffect } from 'react';
import Header from './Header';
function Quiz({ }) {

  const [empty, setEmpty] = useState(true);
  const [link, setLink] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [title, setTitle] = useState('')
  const [vlen, setLength] = useState('')
  const [res, setRes] = useState([]);
  const [selectedResolution, setSelectedResolution] = useState('');
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    setLink(event.target.value);
  };

  const handleResolutionChange = (e) => {
    setSelectedResolution(e.target.value);
  };

  useEffect(() => {
    if (link.trim() === '') {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [link]);

  const handleDownload = async () => {
    setLoading(true)
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("link", 'https://www.youtube.com/watch?v=LXb3EKWsInQ&t=19s&pp=ygUGbmF0dXJl')
    formdata.append("type", 'video')
    formdata.append("res", selectedResolution)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    try { //   http://calebalwa.pythonanywhere.com/

      const response = await fetch(" http://calebalwa.pythonanywhere.com/", requestOptions)
      console.log(response)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'video(caleb).mp4'; // You can specify the filename here
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.log('error', error);
    }
    setLoading(false)
  }

  const handleSubmit = async () => {
    setLoading(true)
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("link", 'https://www.youtube.com/watch?v=LXb3EKWsInQ&t=19s&pp=ygUGbmF0dXJl')
    formdata.append("type", 'name')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    try { //   http://calebalwa.pythonanywhere.com/

      const response = await fetch("http://127.0.0.1:5000/", requestOptions)
        .then(response => response.text())
        .then(text => {
          const [responseTitle, responseImg, responseLength, resolutionsString] = text.split("<");

          const cleanedString = resolutionsString.replace(/[{} ]/g, '').replace(/''/g, ' ');
          const resolutionsArray = cleanedString.split(',');

          // Set title and length in the component's state
          setTitle(responseTitle);
          setImageURL(responseImg);
          setLength(responseLength);
          setRes(resolutionsArray);
          setSelectedResolution(res[0]);

        });

    } catch (error) {
      console.log('error', error);
    }
    setLoading(false)
  };

  return (
    <div className='h-screen bg-black bg-no-repeat bg-cover bg-center '>
      <div className='flex flex-col justify-between h-full'>

        <div>
          <p className=''>
            Do Not Delete
          </p>

          <div className=''>
            <Header />
          </div>

          <div className='flex justify-center flex-col mt-10 gap-3'>

            <div className='flex justify-center flex-row gap-2 w-full'>
              <input onChange={handleInputChange}
                type="text" name="name" className='block rounded-md w-[80%] py-2 pl-3 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' placeholder=" Paste your video link here" />
            </div>
            <div>
              <div className='flex items-center justify-center mb-5'>
                <button
                  onClick={handleSubmit}
                  className={`text-sm text-slate-500 py-2 px-6 rounded-full border-0 text-sm font-semibold bg-violet-50 text-violet-700 hoverbg-violet-100transition-opacity duration-700 ease-in-out 
              ${(empty == false) ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                  Submit
                </button>
              </div>


            </div>

          </div>

          {loading && <p className="animate-pulse font-bold text-white flex justify-center items-center text-lg mb-2">Loading...</p>}

          {imageURL && <div className='rounded-md flex justify-center'>
            <div className='xl:w-5/12 w-9/12 flex justify-center flex-col sm:flex-row rounded-md border-2 border-white gap-3 justify-between'>

              <img className='h-44 mt-1 mb-1 ml-1 mr-1 rounded-md' src={imageURL} alt="Server Image" />

              <div className='w-full flex flex-col items-center '>
                <p className='text-white font-bold mt-5'> {title} </p>
                <p className='text-white font-bold mt-2'> {vlen} </p>

                <div className='mt-2 xl:mb-0 mb-2'>

                  <button
                    onClick={handleDownload}
                    className={`text-sm text-slate-500 py-1 px-4 text-sm rounded-md font-semibold bg-violet-50 text-violet-700 hoverbg-violet-100 transition-opacity duration-700 ease-in-out`}
                  >
                    Download
                  </button>

                  <select className='ml-3 bg-black text-white font-bold rounded-md border border-white' value={selectedResolution} onChange={handleResolutionChange}>
                    {res.map((resolution, index) => (
                      <option className='text-white font-semibold ' key={index} value={resolution}>
                        {resolution.replace("'", " ").replace("'", " ")}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

            </div>
          </div>}


        </div>
      </div>
    </div >

  );
}


export default Quiz;

const GetQuiz = () => {



  return (
    <div className='text-white'>
      {imageURL && <img src={imageURL} alt="Server Image" />}
      <p className='text-white'> {title} </p>
    </div>
  )
}







{/* {responseData ? (
        <div>
          <p>Response from API:</p>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}






        // const [responseData, setResponseData] = useState(null); // State to store the response data

  // useEffect(() => {
  //   const options = {
  //     method: 'POST',
  //     url: 'https://api.cohere.ai/v1/generate',
  //     headers: {
  //       accept: 'application/json',
  //       'content-type': 'application/json',
  //       authorization: 'Bearer aKEn2quoJSbVbeqviRLMGgvxz86VKgN6YibWpnQm'
  //     },
  //     data: {
  //       max_tokens: 20,
  //       truncate: 'END',
  //       return_likelihoods: 'NONE',
  //       prompt: 'what is 2 * 2'
  //     }
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       setResponseData(response.data); // Update the state with the response data
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }, []);