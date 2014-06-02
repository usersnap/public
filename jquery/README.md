Usersnap jQuery Plugin
======================
With the Usersnap JQuery Plugin you can easily integration Usersnap (http://usersnap.com) as visual feedback tool into your website or web application. Your customers can annotate the screenshots for bugreports or other visual feedback.

If you have any questions, [contact the Usersnap team](https://usersnap.com/contact).

Documentation
=============

The Usersnap jQuery plugin requires jQuery with a version of 1.7.0 or higher. The whole plugin is GPLv2 licensed. To get this plugin working you will need an Usersnap account. You can [signup here](https://usersnap.com/signup) for a 15 day trial.


Installing the plugin
---------------------
Download the plugin from our public GitHub repository. Include the Usersnap jQuery plugin in your HTML file:

```
<script type="text/javascript" src="jquery.usersnap-0.1.0.js"></script>
```

Initialize the plugin
---------------------
After you have included the source code to your HTML site, initialize the plugin before you execute Usersnap commands. You have to call the init method with the configuration object for your Usersnap API key.

```
<script type="text/javascript">
    $.usersnap({
        apiKey: '[your-api-key]',
        emailBox: true,
        usersnapLoaded: function() {
            alert('Usersnap is ready!')
        }
    });
</script>
```
The configuration object contains the following properties:

  * ```apiKey```: That property specifies the Usersnap apikey.
  * ```emailBox```: If you want that your users should see a email field please specify this property with true.
  * ```usersnapLoaded```: This method will be invoked after Usersnap is initialized!

Call methods
------------
After you have initialized the Usersnap jQuery plugin successfully, you can use the public methods of that plugin.

  * ```show```: Displays the Usersnap widget
  * ```emailbox```: Changes the value of the email box field. You can set the email address of your logged user if you know it already.
  * ```language```: Changes the language of the Usersnap widget. See the language list for details.
You can call one of these functions very easily:

```
<script type="text/javascript">
    $.usersnap('show');
</script>
```
To specify a parameter, just put all the parameters after the method name:
```
<script type="text/javascript">
    $.usersnap('language', 'de');
</script>
```


