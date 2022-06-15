jsonUrl = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// dropdown menu creation
d3.json(jsonUrl).then(function (contents) {
    // loop through subject IDs and create dropdown menu option for each
    for (let i = 0; i < contents['names'].length; i++) {
        d3.select("#selDataset").append('option')
            .text(contents['names'][i])
            .attr('value', contents['names'][i]);
    }
    });

function showSample() {
    d3.json(jsonUrl).then(function (contents) {
        // assigning selection from dropdown menu to variable
        let subjectId = d3.select("#selDataset").property('value');

        console.log(subjectId);

        // assign filtered data for bar and bubble charts to variable
        let subjectData = contents['samples'].filter((item) => item.id === subjectId);
   
        // plotting bar chart
        let barData = [{
            x : subjectData[0]['sample_values'].slice(0,10).reverse(),
            y : subjectData[0]['otu_ids'].map((item) => `OTU ${item}`).slice(0,10).reverse(),
            type : 'bar',
            text : subjectData[0]['otu_labels'].slice(0,10).reverse(),
            orientation : 'h',
            marker: {
                color: '#1086a5'
            }
        }];

        Plotly.newPlot("bar",barData);

        // plotting bubble chart
        let bubbleData = [{
            x : subjectData[0]['otu_ids'],
            y : subjectData[0]['sample_values'],
            text : subjectData[0]['otu_labels'],
            mode : 'markers',
            marker: {
                size : subjectData[0]['sample_values'],
                color : subjectData[0]['otu_ids'],
                colorscale : 'YlGnBu',
                sizeref : 1.2
            }
        }];

        let bubbleLayout = {
            xaxis : {
                title : {
                    text : 'OTU ID'
                }
            }
        };

        Plotly.newPlot("bubble",bubbleData,bubbleLayout);


        // filter metadata for demographic info
        let subjectMeta = contents['metadata'].filter((item) => item.id === parseInt(subjectId));
        d3.selectAll('p').remove();
        // iterate through number of keys in object and append paragraph for each key-value pair
        for (let i = 0; i < Object.keys(subjectMeta[0]).length;i++) {
            d3.select('#sample-metadata')
                .append('p')
                .text(`${Object.keys(subjectMeta[0])[i]}: ${subjectMeta[0][Object.keys(subjectMeta[0])[i]]}`);
        };

        // plot bonus gauge chart
        let gaugeData = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: subjectMeta[0].wfreq,
              title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9] },
                bar: { color : 'black' },
                steps: [
                    { range: [0, 1], color: "#C9F3E7"},
                    { range: [1, 2], color: "#A7DFCF"},
                    { range: [2, 3], color: "#62B66D"},
                    { range: [3, 4], color: "#5FA48F"},
                    { range: [4, 5], color: "#627EB6"},
                    { range: [5, 6], color: "#706BC0"},
                    { range: [6, 7], color: "#876BC0"},
                    { range: [7, 8], color: "#A96BC0"},
                    { range: [8, 9], color: "#D6ACE5"},

                ],
              },
            }
          ];

        Plotly.newPlot("gauge",gaugeData);

    });
};

showSample();

// call showSample function that regenerates charts based on new dropdown menu selection
d3.selectAll("#selDataset").on("change", showSample);


