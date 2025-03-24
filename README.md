# framer

A simple application to simplify creating profile images for mobilizing efforts.

In its most basic operation, it allows the end user to select a local (to their computer) profile
image and perform an in-browser overlay of the mobilizing "frame". The profile image can be 
dragged and scaled to better fit the frame opening.

In case the user prefers, it can instead use an alternate image (the "solid" image) to the corner
of the profile image. The app supports scaling the corner image as well as selecting which corner
to overlay.

## Getting it running

The easiest way to get this running is to deploy the docker image and mount your replacement files
under `/usr/share/nginx/html/swappable`.

## Swappable files

### Frame.png
This is the main "frame" and default behavior.

This app assumes a profile "frame" with a transparent region for the user to position their profile
image.

This image should be a 1024px square PNG with transparency enabled.

Filename should be "Frame.png" and is case-sensitive.

### Solid.png
This is the alternate corner overlay image.

This image should be a 1024px square PNG without transparent regions (opaque background). 

Filename should be "Solid.png"


### logo192.png favicon.ico
These are the standard webpage favicon files.
