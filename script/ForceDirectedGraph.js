
       function drawFDG() {
            var w = 250;
            var h = 500;

            var fdg = d3.select(".fdg")
            
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("style","vertical-align: top;");
             var simulation;
        
    
            var color =d3.scaleOrdinal(d3.schemeCategory20);
            fdg.selectAll("g").remove()

            fdg.append("text").text("Collaboration Graph").attr("x",0).attr("y", 50).attr("font-size",25);
            var graph = {
                nodes: [],
                links: []
            }
            simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function (d) { return d.id; }))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(w / 2, h / 2));

            
           getGraphOfCollaboration().then(results => {
                graph.links = results[0]
                graph.nodes = results[1]
                
                var link1 = fdg.append("g")
                    .attr("class", "links")
                    .selectAll("line")
                    .data(graph.links)
                link1.exit().remove()
                var link = link1.enter().append("line")
                    .attr("stroke", "rgb(0,0,0)")
                    .attr("stroke-width", function (d) { return d.value *0.1; });

                var node1 = fdg.append("g")
                    .attr("class", "nodes")
                    .selectAll("circle")
                    .data(graph.nodes)
                node1.exit().remove()
                var node = node1.enter().append("circle")
                    .attr("r", 5)
                    .attr("fill",function(d,i){return color(i);});

                node.call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

                node.append("title")
                    .text(function (d) { return d.id; });

                simulation
                    .nodes(graph.nodes)
                    .on("tick", ticked);

                simulation.force("link")
                    .links(graph.links)

                function ticked() {
                    link
                        .attr("x1", function (d) { return d.source.x; })
                        .attr("y1", function (d) { return d.source.y; })
                        .attr("x2", function (d) { return d.target.x; })
                        .attr("y2", function (d) { return d.target.y; });

                    node
                        .attr("cx", function (d) { return d.x; })
                        .attr("cy", function (d) { return d.y; });
                }
                function dragstarted(d) {
                    console.log("start")
                    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }

                function dragged(d) {
                    console.log("dragging")
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;
                }

                function dragended(d) {
                    console.log("end")
                    if (!d3.event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }



            })
        }