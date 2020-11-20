# Import Posts from other platforms into WordPress

Use of this tool requires the `JWT Auth` plugin to be installed. Follow the instructions and add the appropriate lines to your `wp-config.php` and `.htaccess` files.

1. Enter your site URL
2. Select a spreadsheet with the following columns: `slug`, `title`, `date`, and `content`
3. Assign columns to WP_Post fields.
4. Select which rows to upload.
5. Authenticate as a user of that site
6. Begin uploading

### Roadmap / Things to Fix

- Clean up the Results page. Hide success/failure if there are no items in those lists.
