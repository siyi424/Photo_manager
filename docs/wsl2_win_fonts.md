# wsl2 use windows fonts
```
sudo mkdir /usr/share/fonts/win11 # to differentiate self-built font links from system font files 
sudo ln -s /mnt/c/Windows/Fonts/* /usr/share/fonts/win11
```