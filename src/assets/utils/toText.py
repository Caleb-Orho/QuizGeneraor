from PyPDF2 import PdfReader
from flask import Flask, request, request, Response, send_file
from flask_cors import CORS
import time
import moviepy.editor
import os
import asyncio
from pythumb import Thumbnail
from pytube import YouTube 
import threading

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def convert_pdf():
    deleteFiles()
    if(request.form['type'] == 'ex'):
        return extractaudio()
    
    elif (request.form['type'] == 'name'):
        return YouTube(request.form['link']).title + "<" + str(YouTube(request.form['link']).thumbnail_url) + "<" + str(convert(YouTube(request.form['link']).length)) + "<" + str(getResolution())
    
    elif (request.form['type'] == 'resolution'):
        return getResolution()
    
    elif (request.form['type'] == 'video'):
        return downloadVideo()
     
def extractaudio():
    video_path = "C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\" + request.files['file'].filename

    request.files['file'].save(video_path)

    audio = moviepy.editor.VideoFileClip(video_path).audio
    audio.write_audiofile("C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\test.mp3")

    return send_file(
         "C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\test.mp3", 
         mimetype="audio/wav", 
         as_attachment=True, 
         download_name= "test.mp3")

def convert(seconds):
    seconds = seconds % (24 * 3600)
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60
    
    if(hour == 0):
        return "%02d:%02d" % (minutes, seconds)
    return "%d:%02d:%02d" % (hour, minutes, seconds)

def deleteFiles():
    try:
        files = os.listdir("C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\")
        for file in files:
            file_path = os.path.join("C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\", file)
            if os.path.isfile(file_path):
                os.remove(file_path)
        print("All files deleted successfully.")

    except OSError:
        print("Error")

def downloadVideo():
    yt = YouTube(request.form['link'])
    yt.streams.filter(res=request.form['res'].replace("'", '')).first().download(output_path="C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\", filename='trash.mp4')
    # mp4files.download(output_path="C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\", filename='trash')

    return send_file(
        "C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\trash.mp4",
        mimetype='video/mp4',
        as_attachment=True,  # Set this to True to prompt the user to download the file
        download_name='video.mp4'  # Specify the filename seen by the client
    )

def getResolution():
    yt = YouTube('https://youtu.be/L7EuKBJlluQ?si=r2T5zrtXhC0-dz40')
    streams = yt.streams
    resolutions = set(stream.resolution for stream in streams if stream.resolution)
    return resolutions

if __name__ == '__main__':

    # yt = YouTube('https://youtu.be/L7EuKBJlluQ?si=r2T5zrtXhC0-dz40')
    # yt.streams.filter(res="720p").first().download(output_path="C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\")
    # # Extract unique resolutions
    # resolutions = set(stream.resolution for stream in streams if stream.resolution)
    # print(resolutions)


    # # mp4files = yt.streams.get_highest_resolution()
    # mp4files = yt.streams.get_by_resolution('1080p')



    # # Download the video
    # mp4files.download(output_path="C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\")

    


    app.run(debug=True)


    # print(request.form['type'])
    # reader = PdfReader(request.files['file'])
    # pages_text = []

    # for page in reader.pages:
    #     text = page.extract_text()
    #     pages_text.append(text)

    # all_text = "\n".join(pages_text)
    # return all_text





    # def youTube():
    # t = Thumbnail(request.form['link'])
    # t.fetch()
    # t.save("C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\", filename='test')

    # # try: 
    # #     # object creation using YouTube
    # #     # which was imported in the beginning 
    # #     yt = YouTube(request.form['link']) 
    # #     print(yt.title)
    # # except: 
    # #     print("Connection Error")

    # while(os.path.exists("C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\test.jpg") == False):
    #     print('fail')

    # return send_file(
    #      "C:\\Users\\Caleb Orhomre\\Desktop\\ReactProjects\\QuizGenerator\\src\\assets\\utils\\files\\test.jpg", 
    #      mimetype="image/jpeg", 
    #      as_attachment=True)