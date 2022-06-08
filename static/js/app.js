jsonUrl = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

function init() {
    d3.json(jsonUrl).then(function (contents) {
        // store all subject IDs in an array
        let subjectIds = contents['names'];
        
        let dropdownMenu = d3.select("#selDataset");

        // loop through subject IDs and create dropdown menu option for each
        for (let i = 0; i < subjectIds.length; i++) {
            dropdownMenu.append('option').text(subjectIds[i]);
        };
        console.log(subjectIds);

        // let subjectId = dropdownMenu.text();
        // console.log(subjectId);
        let subjectId = '940';
        let subjectData = contents['samples'].filter((item) => item.id === subjectId);

        console.log(subjectData);

        let x = subjectData[0]['sample_values'].slice(0,10).reverse();
        let y = subjectData[0]['otu_ids'].map((item) => `OTU ${item}`).slice(0,10).reverse();
   
        let data = [{
            x : x,
            y : y,
            type : 'bar',
            orientation : 'h'
        }];

        let layout = {
            title : 'Test'
        };
        Plotly.newPlot("bar",data,layout);

        // filter metadata to retain info for relevant subject ID
        let subjectMeta = contents['metadata'].filter((item) => item.id === parseInt(subjectId));
        // iterate through number of keys in object and append paragraph for each key-value pair
        for (let i = 0; i < Object.keys(subjectMeta[0]).length;i++) {
            d3.select('#sample-metadata')
                .append('p')
                .text(`${Object.keys(subjectMeta[0])[i]}: ${subjectMeta[0][Object.keys(subjectMeta[0])[i]]}`);
        };

    });
};

init()



