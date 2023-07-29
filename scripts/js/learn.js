(function($) {
    function generatelearnTypesHtml(learns) {
        // Get the unique learn types
        const learnTypes = [...new Set(learns.map(learn => learn.type))];
    
        // Generate the HTML for the learn types
        const learnTypesHtml = learnTypes.map(type => `
        <li class="learn-type text-center">
            <a href="#${type}" onclick="updateCurrent('${type}')">${type}</a>
        </li>
    `).join("");
    
        return learnTypesHtml;
    }
    
    function updateCurrent(type) {
        // Remove the "current" class from all learn type links
        $("#learn-types a").removeClass("current");
    
        // Add the "current" class to the clicked learn type link
        $(`#learn-types a[href='#${type}']`).addClass("current");
    }
    
    function updateSelectedlearnsTable(learns) {
        // Get the selected learn type
        const selectedlearnType = $("#learn-types a.current").attr("href").substring(1);
    
        // Filter the learns by the selected type
        const selectedlearns = learns.filter(learn => learn.type === selectedlearnType);
    
        // Generate the HTML for the selected learns table
        const selectedlearnsHtml = `
        <tr>
            <th>Title</th>
            <th>Description</th>
        </tr>
        ${selectedlearns.map(learn => `
            <tr>
            <td><a href="${learn.url}">${learn.name}</a></td>
            <td>${learn.description}</td>
            </tr>
        `).join("")}
        `;
    
        // Set the h2 title to the selected learn type
        $("#learn-type-title").text(selectedlearnType);
    
        // Clear the table content before updating it with the new learn data
        $("#learns tbody").empty().append(selectedlearnsHtml);
    }
    
    // Load the learn data from the JSON file
    const xhrObj = new XMLHttpRequest();
    xhrObj.open("GET", location.origin + "/terrence_world/data/learns.json");
    xhrObj.onload = () => {
        if (xhrObj.status === 200) {
        // Parse the JSON data
        const learns = JSON.parse(xhrObj.responseText);
    
        // Generate the HTML for the learn types and add it to the page
        const learnTypesHtml = generatelearnTypesHtml(learns);
        $("#learn-types").html(learnTypesHtml);
    
        // Add click event listeners to the learn type links
        $("#learn-types a").on("click", function() {
            // Update the "current" class on the learn type links
            $("#learn-types a.current").removeClass("current");
            $(this).addClass("current");
    
            // Update the selected learns table
            updateSelectedlearnsTable(learns);
    
            // Prevent the default behavior of the anchor link
            return false;
        });
    
        // Initialize the page with the first learn type selected
        $("#learn-types a:first").addClass("current");
        updateSelectedlearnsTable(learns);
        }
    };
    xhrObj.send();
    })(jQuery);
    
    function updateCurrent(type) {
        $("#learn-types a").removeClass("current");
        $(`#learn-types a[href='#${type}']`).addClass("current");
      }