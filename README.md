# Photo Manager
hello, this is a photo manage software.

(wsl2 users, must have linux GUI browser like google-chrome first, then can run 'npm start').

## Video 
[![PhotoManager Intoduction](http://img.youtube.com/vi/g4oI4jd4q8Y/0.jpg)](https://youtu.be/g4oI4jd4q8Y)


## shortcuts
open F12 develop-tools: " shift + ctrl + I "

## Notes
Whenever I come back from a photo shoot, the SD card is always full of photos that I can not easily select the photos I want to process later in the Photoshop. So I develop a software use electron to help me solve this problem. The workflow is: 
1. create a new subfolder under where locate all your photos to store the original picures with both JPG & NEF formats taken this time.
2. use Photo Manager software to open this subfolder and see the displayed JPG files.
3. select and click the files I want to process later in Photoshop, the software will automatically select the relavent NEF files. 
4. click 'Open in PS', the NEF files will be open in Photoshop.
5. enjoy the PS work.


## Future
- Fast transfer of large image files between different computers. 