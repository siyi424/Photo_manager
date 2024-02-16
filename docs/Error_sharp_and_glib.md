# Error： sharp & glib
they are not coordinate.

```
(process:86203): GLib-GObject-WARNING **: 23:38:25.029: cannot unreference class of invalid (unclassed) type '(null)'

(process:86203): GLib-CRITICAL **: 23:38:25.041: g_datalist_id_set_data_full: assertion 'key_id > 0' failed

***MEMORY-ERROR***: [86203]: GSlice: assertion failed: sinfo->n_allocated > 0
```
I use the wsl2 Ubuntu and manually install libvips which is a C++ library. 
It's very awful to run C++ here. 
And glib is the key library in linux system like Ubuntu for its GNOME. 

**The cause of this problem is the bad performance of the glib !!!
I use sharp to generate many thumbnails and save them in a temp folder.

Solution: raplace glib by jemalloc.**

github pr: https://github.com/lovell/sharp/issues/1803