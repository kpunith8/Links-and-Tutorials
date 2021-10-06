## Cross-Site Request Forgery (CSRF)

- It is an attack that forces an end user to `execute unwanted actions` on a web application in which they’re currently `authenticated`.

- It inherits the `identity` and `privileges` of the victim to perform an undesired function on the victim’s behalf.

- CSRF attacks are also known by a number of other names, including `XSRF`, “Sea Surf”, `Session Riding`, `Cross-Site Reference Forgery`, and `Hostile Linking`.

- A successful CSRF attack can force the user to perform state changing requests like `transferring funds`, `changing their email address` and so forth

### Prevention measures that don't work

- Using a secret cookie - all cookies, even the secret ones, will be submitted with every request.  All authentication tokens will be submitted regardless of whether or not the end-user was tricked into submitting the request.

- Only accepting POST requests

- Multi-Step Transactions

- URL Rewriting

- HTTPS - HTTPS by itself does nothing to defend against CSRF

##  Cross-Site Scripting (XSS)

- These attacks are a `type of injection`, in which `malicious scripts are injected` into otherwise benign and trusted websites.

- The malicious script can access any `cookies`, `session tokens`, or other sensitive information retained by the browser and used with that site.

### Types 

- `Reflected XSS`- Reflected attacks are those where the `injected script is reflected off the web server`, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request.

Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website

- `Stored XSS `-  Stored attacks are those where the injected script is permanently stored on the target servers, such as in a database, in a message forum, visitor log, comment field, etc. The victim then retrieves the malicious script from the server when it requests the stored information. Stored XSS is also sometimes referred to as `Persistent or Type-I XSS`.

- DOM Based XSS - The attack `payload is executed` as a result of modifying the `DOM environment` in the victim’s browser used by the original client-side script, so that the client-side code runs in an `unexpected` manner.

### Prevention

- Both reflected and stored XSS can be addressed by performing the `appropriate validation and encoding` on the `server-side`.
