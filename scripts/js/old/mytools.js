// function updateCurrent(href) {
//   // Find the previous current item and remove the "current" class
//   let currentEl = document.querySelector("#nav ul li a[id='current2']");
//   if (currentEl) {
//     currentEl.removeAttribute("id");
//   }
//   // Add the "current" class to the newly selected item
//   const newEl = document.querySelector("#nav");
//   // let newEl = document.querySelector(`#nav li a[href='#${href.trim()}']`);
//   console.log("This is a log message" + href);
//   console.log("This is a log message" + newEl);
//   if (newEl) {
//     newEl.setAttribute("id", "current2");
//   }
// }
(function($) {
function generateToolTypesHtml(tools) {
    // Get the unique tool types
    const toolTypes = [...new Set(tools.map(tool => tool.type))];

    // Generate the HTML for the tool types
    const toolTypesHtml = toolTypes.map(type => `
    <li class="tool-type text-center">
        <a href="#${type}" onclick="updateCurrent('${type}')">${type}</a>
    </li>
    `).join("");

    return toolTypesHtml;
}

function updateSelectedToolsTable(tools) {
    // Get the selected tool type
    const selectedToolType = $("#tool-types a.current").attr("href").substring(1);

    // Filter the tools by the selected type
    const selectedTools = tools.filter(tool => tool.type === selectedToolType);

    // Generate the HTML for the selected tools table
    const selectedToolsHtml = `
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    ${selectedTools.map(tool => `
        <tr>
        <td><a href="${tool.url}">${tool.name}</a></td>
        <td>${tool.description}</td>
        </tr>
    `).join("")}
    `;

    // Set the h2 title to the selected tool type
    $("#tool-type-title").text(selectedToolType);

    // Clear the table content before updating it with the new tool data
    $("#tools tbody").empty().append(selectedToolsHtml);
}

// Load the tool data from the JSON file
const xhrObj = new XMLHttpRequest();
xhrObj.open("GET", location.origin + "data/tools.json");
xhrObj.onload = () => {
    if (xhrObj.status === 200) {
    // Parse the JSON data
    const tools = JSON.parse(xhrObj.responseText);

    // Generate the HTML for the tool types and add it to the page
    const toolTypesHtml = generateToolTypesHtml(tools);
    $("#tool-types").html(toolTypesHtml);

    // Add click event listeners to the tool type links
    $("#tool-types a").on("click", function() {
        // Update the "current" class on the tool type links
        $("#tool-types a.current").removeClass("current");
        $(this).addClass("current");

        // Update the selected tools table
        updateSelectedToolsTable(tools);

        // Prevent the default behavior of the anchor link
        return false;
    });

    // Initialize the page with the first tool type selected
    $("#tool-types a:first").addClass("current");
    updateSelectedToolsTable(tools);
    }
};
xhrObj.send();
})(jQuery);