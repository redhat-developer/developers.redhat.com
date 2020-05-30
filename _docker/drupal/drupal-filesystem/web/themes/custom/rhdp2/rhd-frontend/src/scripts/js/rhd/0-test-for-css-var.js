(function() {
    function browserCanUseCssVariables() {
        return window.CSS && CSS.supports('color', 'var(--fake-var)');
    }
      
    if (!browserCanUseCssVariables()) {
        // Get HTML head element 
        var head = document.getElementsByTagName('HEAD')[0];  
  
        // Create new link Elements
        var link = document.createElement('link'); 
        var link_override = document.createElement('link'); 

        // set the attributes for link element  
        link.rel = 'stylesheet';  
        link.type = 'text/css'; 
        link.href = '/themes/custom/rhdp2/css/rhd.ie11.min.css';  
        link_override.rel = 'stylesheet';  
        link_override.type = 'text/css'; 
        link_override.href = '/themes/custom/rhdp2/css/rhd.ie11-overrides.css';  
  
        // Append link elements to HTML head
        head.appendChild(link);  
        head.appendChild(link_override);  

        // Remove the non ie stylesheet
        $('link[href^="/themes/custom/rhdp2/rhd-frontend/dist/css/rhd.min.css"]').prop('disabled', true).remove();
    } 
  })();
  

