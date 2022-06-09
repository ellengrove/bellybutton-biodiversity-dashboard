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

// initial charts
function showSample() {
    d3.json(jsonUrl).then(function (contents) {
        
        let subjectId = d3.select("#selDataset").property('value');

        console.log(subjectId);

        // filter data for bar and bubble charts
        let subjectData = contents['samples'].filter((item) => item.id === subjectId);

        console.log(subjectData);

        let barX = subjectData[0]['sample_values'].slice(0,10).reverse();
        let barY = subjectData[0]['otu_ids'].map((item) => `OTU ${item}`).slice(0,10).reverse();
   
        let barData = [{
            x : barX,
            y : barY,
            type : 'bar',
            orientation : 'h'
        }];

        Plotly.newPlot("bar",barData);

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

    });
};

showSample();

d3.selectAll("#selDataset").on("change", showSample);


