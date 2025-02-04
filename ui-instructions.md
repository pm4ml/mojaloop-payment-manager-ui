# How to Customise the Payment Manager

To customise the payment manager, follow these steps:


## Step 1: Create a Configuration File Override

## Step 2: Customize Configuration Variables
You can customize the following variables in the configuration file based on your requirements:

- **PRIMARY_COLOR**: The primary color of the payment manager. (Applies to charts, modals and buttons)
- **SECONDARY_COLOR**: The secondary color of the payment manager. (Applies to navbar and borders.) 
- **ACCENT_COLOR**: The accent color of the payment manager. (Applies to navbar and borders.) 
- **TITLE**: The title of the payment manager.
- **COUNTRY_LOGO**: The DFSP logo/Country Logo, specified as a URL or base64-encoded string.
- **LOGO**: 
-   The logo or image for the title, specified as a URL or base64-encoded string.

### Note on Image Dimensions:
Ensure the images meet the following dimensions:

- **LOGO**:  126x45 pixels
- **COUTNRY_LOGO**: 50x50 pixels

You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.

## Step 3: Convert Images to Base64

If you want to use base64-encoded images for LOGO or COUNTRY_LOGO, follow these steps:

- Convert the Image to WebP Format:	
	- Use the website [CloudConvert](https://cloudconvert.com/) to convert your image to WebP format.
		- Select the source and target formats.
		- Upload your image.
		- Click "Convert" and download the WebP image.

- Encode the WebP Image to Base64:
	- Use the website [Base64-Image](https://www.base64-image.de/) to convert the WebP image to a base64 string.
	-   Once the encoding is complete, copy the base64 string.
	-   Replace <base64-encoded-image> in the configuration file with the base64 string.

Example format:	

	data:image/webp;base64,<base64-encoded-image>
	
Use this link to generate WebP format images: [https://caniuse.com/webp](https://caniuse.com/webp)
