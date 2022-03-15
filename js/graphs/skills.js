const skills_data = [
    {
        "name": "Rust",
        "value": 4.5,
        "tags": []
    }
    {
        "name": "Git",
        "value": 3.4,
        "tags": []
    },
    {
        "name": "Unix",
        "value": 3.9,
        "tags": [
            "Backend Engineering"
        ]
    },
    {
        "name": "C#",
        "value": 1.7,
        "tags": [
            "Backend Engineering",
            "Software Languages"
        ]
    },
    {
        "name": "Python",
        "value": 5,
        "tags": [
            "Software Languages",
            "Data Science",
            "Machine Learning",
            "Backend Engineering"
        ]
    },
    {
        "name": "Golang",
        "value": 4.1,
        "tags": [
            "Software Languages",
            "Backend Engineering"
        ]
    },
    {
        "name": "Tensorflow",
        "value": 2.5,
        "tags": [
            "Machine Learning",
            "Data Science"
        ]
    },
    {
        "name": "C++",
        "value": 4,
        "tags": [
            "Software Languages",
            "Backend Engineering",
            "Machine Learning"
        ]
    },
    {
        "name": "Java",
        "value": 4,
        "tags": [
            "Software Languages",
            "Backend Engineering"
        ]
    },
    {
        "name": "Pytorch",
        "value": 4.3,
        "tags": [
            "Machine Learning",
            "Data Science"
        ]
    },
    {
        "name": "R",
        "value": 2,
        "tags": [
            "Software Languages",
            "Data Science"
        ]
    },
    {
        "name": "Javascript",
        "value": 3,
        "tags": [
            "Software Languages",
            "Backend Engineering"
        ]
    },
    {
        "name": "Scala",
        "value": 2.3,
        "tags": [
            "Software Languages",
            "Data Science",
            "Backend Engineering"
        ]
    },
    {
        "name": "Spark",
        "value": 2.1,
        "tags": [
            "Software Languages",
            "Data Science",
            "Backend Engineering"
        ]
    },
    {
        "name": "Ruby",
        "value": 0.9,
        "tags": [
            "Software Languages"
        ]
    },
    {
        "name": "SQL",
        "value": 3.3,
        "tags": [
            "Software Languages",
            "Databases",
            "Backend Engineering",
            "Data Science",
        ]
    },
    {
        "name": "Graph DB",
        "value": 2.4,
        "tags": [
            "Databases",
            "Backend Engineering",
            "Data Science",
        ]
    },
    {
        "name": "Docker",
        "value": 2.6,
        "tags": [
            "Cloud Tools",
            "Backend Engineering"
        ]
    },
    {
        "name": "AWS",
        "value": 3.2,
        "tags": [
            "Cloud Tools",
            "Backend Engineering"
        ]
    },
    {
        "name": "MongoDB",
        "value": 2.5,
        "tags": [
            "Databases",
            "Backend Engineering"
        ]
    },
]

const width = document.getElementById("skills").offsetWidth
const margin = ({top: 30, right: 40, bottom: 10, left: 10})
const barHeight = 35

function generateGraph(data) {
    console.log(data)
    var height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom
    var x = d3.scaleLinear()
        .domain([0,d3.max(data,d => d.value)])
        .range([margin.left, width - margin.right])
    var y = d3.scaleBand()
        .domain(d3.range(data.length))
        .rangeRound([margin.top,height-margin.bottom])
        .padding(0.1)
    var xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80, data.format).tickFormat(function(d){
            switch (d) {
                case 0.0: return "Basic";
                case 2.5: return "Proficient";
                case 5.0: return "Knowledgeable";
            }
        }))
        .attr("font-size", 16)
        .call(g => g.select(".domain").remove())
    var yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
    var svg = d3.select("#skills").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var bars = svg.append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", x(0))
        .attr("y", (d, i) => y(i))
        .attr("width", 0)
        .attr("height", y.bandwidth())
        .attr("fill", function(d) {
            return "rgb("+(38+(0-38)*d.value*0.2)+","+(255 + (96-255)*0.2*d.value)+"," + (155+(143-155)*0.2*d.value) + ")";
        })
        .transition()
        .duration(500)
        .attr("width", d => x(d.value) - x(0))

    svg.selectAll("rect")
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', "rgb(39,83,172)");
        })
        .on('mouseout', function(d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", "rgb("+(38+(0-38)*d.value*0.2)+","+(255 + (96-255)*0.2*d.value)+"," + (155+(143-155)*0.2*d.value) + ")");
        });
    var labels = svg.append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 14)
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("x", d => x(d.value))
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", -4)
        .text(d => d.name)
        .call(text => text.filter(d => d.value < 1.0) // short bars
            .attr("dx", +4)
            .attr("fill", "black")
            .attr("text-anchor", "start"));
    var gx = svg.append("g")
        .call(xAxis);

    var gy = svg.append("g")
        .call(yAxis);

    d3.selectAll("button")
        .on("click", function() {
            var buttonID = d3.select(this).attr("id");
            var new_data = filterSkills(buttonID)
            console.log(new_data)
            bars = svg
                .selectAll("rect")
                .data(new_data)
                .join("rect")
                .attr("x", x(0))
                .attr("y", (d, i) => y(i))
                .attr("width", 0)
                .attr("height", y.bandwidth())
                .attr("fill", function(d) {
                    return "rgb("+(38+(0-38)*d.value*0.2)+","+(255 + (96-255)*0.2*d.value)+"," + (155+(143-155)*0.2*d.value) + ")";
                })
                .transition()
                .duration(500)
                .attr("width", d => x(d.value) - x(0));
            svg.selectAll("rect")
                .on('mouseover', function() {
                    d3.select(this)
                        .attr('fill', "rgb(39,83,172)");
                })
                .on('mouseout', function(d) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("fill", "rgb("+(38+(0-38)*d.value*0.2)+","+(255 + (96-255)*0.2*d.value)+"," + (155+(143-155)*0.2*d.value) + ")");
                });
            labels
                .style("opacity",0)
                .remove();
            labels = svg.append("g")
                .attr("fill", "white")
                .attr("text-anchor", "end")
                .attr("font-family", "sans-serif")
                .attr("font-size", 14)
                .selectAll("text")
                .data(new_data)
                .join("text")
                .attr("x", d => x(d.value))
                .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
                .attr("dy", "0.35em")
                .attr("dx", -4)
                .text(d => d.name)
                .call(text => text.filter(d => d.value < 1.0) // short bars
                    .attr("dx", +4)
                    .attr("fill", "black")
                    .attr("text-anchor", "start"));
        })
}

function filterSkills(tag = "None") {
    let data = [];
    if (tag === "None") {
        skills_data.forEach((function (s) {
            data.push(s)
        }));
    } else {
        skills_data.forEach((function (s) {
                if (s.tags.includes(tag)) {
                    data.push(s);
                }
            }
        ))
    }
    return data
}
generateGraph(skills_data.sort((a,b) => b.value - a.value));
