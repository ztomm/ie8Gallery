# ie8Gallery

A very simple gallery plugin, supported by Internet Explorer 8.

**[DEMO](https://ie8gallery.herokuapp.com/)**

>written in pur JS, no Framework needed

## Example for initialization and options

### Javascript part
```
<script type="text/javascript">  
    document.onreadystatechange = function () {  
        if (document.readyState == "interactive") {  
            ie8Gallery = new Ie8Gallery().init({  
                thumbs: '#thumbs',                  // ID for Thumbnail Container  
                thumb: '.thumb',                    // Classname for Thumbnails  
                imageContainer: '#imageContainer',  // ID for the gallery image Container  
                galleryImage: '#galleryimage',      // ID for the gallery image  
                underlay: '#underlay',              // ID for Underlay  
                overlay: '#overlay',                // ID for Overlay  
                btnPrev: '#prev',                   // ID for Previous Button  
                btnNext: '#next',                   // ID for Next Button  
            });  
        }  
    }  
</script>
```

### HTML part
The src attribute is the source for the thumbnail. The data-img-src is the source of the big image.

```
<div class="thumbs">  
    <img class="thumb" src="img/cat1-thumb.jpg" data-img-src="img/cat1.jpg" />  
    <img class="thumb" src="img/cat2-thumb.jpg" data-img-src="img/cat2.jpg" />  
    <img class="thumb" src="img/cat3-thumb.jpg" data-img-src="img/cat3.jpg" />  
    <img class="thumb" src="img/cat4-thumb.jpg" data-img-src="img/cat4.jpg" />  
</div>
```