import { useState } from 'react'
import Header from './Header';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const allowedVideoTypes = ["video/mp4", "video/avi", "video/mpeg"];
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {

      if (allowedVideoTypes.includes(selectedFile.type)) {
        setErrorMessage("");
        setFile(event.target.files[0]);
      } else {
        setErrorMessage("Please select a Video file.");
      }
    } else {
      setErrorMessage("Please select a file.");
    }
  };

  const handleSubmit = async () => {

    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("type", 'ex')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    try { //   http://calebalwa.pythonanywhere.com/
      setLoading(true)
      const response = await fetch("http://calebalwa.pythonanywhere.com/", requestOptions);

      // navigate('/Quiz', { state: {result} });
      const audioBlob = await response.blob(); // Get the audio data as a Blob

      // Create a Blob URL for the audio
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create an invisible <a> element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = audioUrl;

      const originalFileName = file.name;
      const baseName = originalFileName.slice(0, originalFileName.lastIndexOf('.'));

      // Add (test) right before the extension
      const modifiedFileName = `${baseName} (calebtomp3).mp3`;

      downloadLink.download = modifiedFileName; // Specify the filename
      downloadLink.style.display = 'none';

      // Append the <a> element to the document body and trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up the <a> element and URL
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(audioUrl);

    } catch (error) {
      console.log('error', error);
    }
    setLoading(false)
  };

  // bg-[url("./assets/images/background.png")]

  return (
    <div className='h-screen bg-black bg-no-repeat bg-cover bg-center'>
      <div className='flex flex-col justify-between h-full'>

        <div>
          <p className=''>
            Do Not Delete
          </p>

          <div className=''>
            <Header />
          </div>

          <div className='flex items-center justify-center flex-col gap-5 mt-20 font-bold'>

            <p className='animate-bounce text-white font-bold flex items-center justify-center mb-4'>
              Please select video file you want to convert to mp3
            </p>

            <input type="file" accept={allowedVideoTypes}
              id="fileInput"
              onChange={handleFileChange}
              className="text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 "
            />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          </div>

        </div>

        {loading && <p className="animate-pulse font-bold text-white flex justify-center items-center text-lg">Loading...</p>}

        <div>
          <div className='flex items-center justify-center mb-10'>
            <button
              onClick={handleSubmit}
              className={`text-sm text-slate-500
      mr-4 py-2 px-4
      rounded-full border-0
      text-sm font-semibold
      bg-violet-50 text-violet-700
      hoverbg-violet-100 ${(errorMessage == "") && (file != null) ? "opacity-100" : "opacity-0 pointer-events-none"
                } transition-opacity duration-700 ease-in-out`}
            >
              Submit File
            </button>
          </div>
        </div>


      </div>

      {/* <Routes>
        <Route path="Quiz" element={<Quiz />} />
      </Routes> */}
    </div >
  )
}

export default Home
