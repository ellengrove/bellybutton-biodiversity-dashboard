jsonUrl = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

function init() {
    d3.json(jsonUrl).then(function (contents) {
        let subjectIds = contents['names'];
        let dropdownMenu = d3.select("#selDataset");

        for (let i = 0; i < subjectIds.length; i++) {
            dropdownMenu.append('option').text(subjectIds[i]);
        };
        console.log(subjectIds);

        // let subjectId = dropdownMenu.text();
        // console.log(subjectId);
        let subjectId = '941';
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
        Plotly.newPlot("bar",data,layout)
    });
};

init()



