// https://observablehq.com/@d3/zoomable-sunburst@346
export default function define(runtime, observer) {
    const main = runtime.module();
    const fileAttachments = new Map([
        ["flare-2.json", "https://northnodearch.ca/sunburst.json"]
    ]);
    main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
    main.variable(observer()).define(["md"], function(md) {
        return (
            md `# Zoomable Sunburst

This variant of a [sunburst diagram](/@d3/sunburst) shows only two layers of the hierarchy at a time. Click a node to zoom in, or the center to zoom out. Compare to an [icicle](/@d3/zoomable-icicle).`
        )
    });
    main.variable(observer("chart")).define("chart", ["partition", "data", "d3", "width", "color", "arc", "format", "radius"], function(partition, data, d3, width, color, arc, format, radius) {
        const root = partition(data);

        root.each(d => d.current = d);

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, width])
            //.style("font", "12px Futura-Book")
            .style("font-size", "14px")
            .attr("font-weight", "bold")
            .style("fill", "white");

        //document.getElementById("Legend").translateX(50%);

        /*svg
            .append("image")
            .attr(
              "xlink:href",
              "https://nna.polaraxis.ca/legend.svg"
            )
            .attr("width", 250)
            .attr("height", 250)
            .attr("x", width / 2 - 125)
            .attr("y", width / 2 - 125)
            .datum(root)
            .attr("r", radius)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("click", clicked);*/

        const g = svg.append("g")
            .attr("transform", `translate(${width / 2},${width / 2})`);

        const path = g.append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", d => { //while (d.depth > 1) d = d.parent; return color(d.data.name); 
                return d.data.color;
            })
            .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 1 : 1) : 0)
            .attr("d", d => arc(d.current))
            .on("mouseover", mouseover)

        // .on("click", clicked);

        path.filter(d => d.children)
            .style("cursor", "pointer")
            .attr("id", d => d.data.id)
            .on("click", clicked);

        /*path.append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);*/

        const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", d => +labelVisible(d.current))
            .attr("transform", d => labelTransform(d.current))
        //.text(d => d.data.name);

        var myText = "test";

        /*if (d => d.current.data.depth==1) {
        myText = (d => d.data.name.split(".").pop().split('!')[0]); 
            }*/

        label
            .append("tspan")
            .attr("x", 0)
            .attr("dy", "0em")
            .text(d => d.data.name.split("!")[0].replace(/[0-9]/g, '').replace('. ', ''));

        label
            .append("tspan")
            .attr("x", 0)
            .attr("dy", "1em")
            .text(d => d.data.name.split("!")[1]);
        label
            .append("tspan")
            .attr("x", 0)
            .attr("dy", "1em")
            .text(d => d.data.name.split("!")[2]);


        const parent = g.append("circle")
            .datum(root)
            .attr("r", radius)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("click", clicked);

        
        

        

        jQuery(function($) {
            $(document).ready(function() {

                var st1 = document.getElementsByClassName("st1");
                var st3 = document.getElementsByClassName("st3");
                var arrayLength = st1.length;
                callMe();
                
                function callMe(pro){
                    
                for (var i = 0; i < arrayLength; i++) {
                    console.log(st1[i]);
                    st1[i].style.fill = "black";
                    st3[i].style.fill = "white";
                    
                }
                
                if (pro>0){
                    
                    for (var i = 1; i <= pro; i++) {
                    document.getElementById("n"+i).style.fill = "black";    
                    document.getElementById("sn"+i).style.fill = "white";
                    
                }
                }
                
                    
                };
                
     
                
                var mutationObserver = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {

                        switch ($("#sSlider").attr("data-active-slide")) {

                            case "et_pb_slide_0":
                                clicked(root);
                                callMe(0);
                                break;

                            case "et_pb_slide_1":
                                clicked(root.children[0]);
                                callMe(1);                          
                                break;

                            case "et_pb_slide_2":
                                clicked(root.children[1]);
                                callMe(2);                            
                                break;

                            case "et_pb_slide_3":

                                clicked(root.children[2]);
                                callMe(3);
                                break;

                            case "et_pb_slide_4":
                                clicked(root.children[3]);
                                callMe(4);
                                break;

                            case "et_pb_slide_5":
                                clicked(root.children[4]);
                                callMe(5);
                                break;

                            case "et_pb_slide_6":
                                clicked(root.children[5]);
                                callMe(6);
                                break;

                            case "et_pb_slide_7":
                                clicked(root.children[6]);
                                callMe(7);
                                break;

                            default:

                                break;
                        }

                    });
                });

                mutationObserver.observe(document.getElementById('sSlider'), {
                    attributes: true,
                });




                $("#c0").on("click", function() {
                    event.preventDefault();
                    clicked(root);
                });
                $("#c1").on("click", function() {
                    event.preventDefault();
                    clicked(root.children[0]);
                });
                $("#c2").on("click", function() {
                    event.preventDefault();
                    clicked(root.children[1]);
                });
                $("#c3").on("click", function() {
                    event.preventDefault();
                    clicked(root.children[2]);
                });
                $("#c4").on("click", function() {
                    event.preventDefault();
                    clicked(root.children[3]);
                });
                $("#c5").on("click", function() {
                    event.preventDefault();
                    clicked(root.children[4]);
                });
                $("#c6").on("click", function() {
                    event.preventDefault();
                    clicked(root.children[5]);
                });
                $("#c7").on("click", function() {
                    event.preventDefault();
                    clicked(root.children[6]);
                });

            });
        });



        document.getElementById("TopGroup").style.opacity = "0";
        document.getElementById("BGroup").style.opacity = "0";
         

        function clicked(p) {


            document.getElementById("NNAlogo").style.opacity = "1";
            document.getElementById("ssLogo").style.opacity = "1";
            //console.log(d3.mouse.this);


            console.log(p.depth);




            document.getElementById("Number").style.fontFamily = "Futura Book Bold";
            document.getElementById("Number").style.fontSize = "18px";
            document.getElementById("Title1").style.fontFamily = "Futura Book Bold";
            document.getElementById("Title1").style.fontSize = "18px";
            document.getElementById("Title2").style.fontFamily = "Futura Book Bold";
            document.getElementById("Title2").style.fontSize = "18px";
            document.getElementById("Title3").style.fontFamily = "Futura Book Bold";
            document.getElementById("Title3").style.fontSize = "18px";

            document.getElementById("TopGroup").style.opacity = "1";
            document.getElementById("BGroup").style.opacity = "1";

           

            if (p.depth == 0) {

                jQuery(function($) {
                    $(".et-pb-controllers a:nth-child(1)").trigger("click");
                });

                /*document.getElementById("ser1").style.opacity = "1";
                document.getElementById("ser2").style.opacity = "1";
                document.getElementById("ser3").style.opacity = "1";
                document.getElementById("ser4").style.opacity = "1";
                document.getElementById("ser5").style.opacity = "1";
                document.getElementById("ser6").style.opacity = "1";
                document.getElementById("ser7").style.opacity = "1";

                document.getElementById("Title2").textContent = "";
                document.getElementById("Title3").textContent = "";
                document.getElementById("Number").textContent = "";
                document.getElementById("Circle").style.opacity = "0";

                document.getElementById("Title1").textContent = p.data.name.toUpperCase().replace('!', '');
                document.getElementById("Title1").setAttribute('text-anchor', 'middle');
                document.getElementById("Title1").setAttribute('y', '50');
                document.getElementById("Title1").setAttribute('x', '125');*/

                document.getElementById("TopGroup").style.opacity = "0";
                document.getElementById("BGroup").style.opacity = "0";
            } else {


                document.getElementById("NNAlogo").style.opacity = "0";
                document.getElementById("ssLogo").style.opacity = "0";

                document.getElementById("ser1").style.opacity = "0";
                document.getElementById("ser2").style.opacity = "0.1";
                document.getElementById("ser3").style.opacity = "0.1";
                document.getElementById("ser4").style.opacity = "0.1";
                document.getElementById("ser5").style.opacity = "0.1";
                document.getElementById("ser6").style.opacity = "0.1";
                document.getElementById("ser7").style.opacity = "0.1";

                if (p.depth == 1) {




                }




                var longT = "";

                if (p.depth == 1) {



                    longT = p.data.name.toUpperCase().split('!');

                } else if (p.depth == 2) {



                    longT = (p.parent).data.name.toUpperCase().split('!');

                }

                jQuery(function($) {
                    $(".et-pb-controllers a:nth-child(" + (Number(longT[0].split(".")[0]) + 1) + ")").trigger("click");
                });


                switch (longT.length) {
                    case 0:
                        break;

                    case 1:


                        document.getElementById("Title2").textContent = "";
                        document.getElementById("Title3").textContent = "";

                        document.getElementById("Title1").textContent = longT[0].toUpperCase().replace('!', '').replace(/[0-9]/g, '').replace('. ', '');
                        document.getElementById("Title1").setAttribute('text-anchor', 'middle');
                        document.getElementById("Title1").setAttribute('y', '65');
                        document.getElementById("Title1").setAttribute('x', '125');


                        document.getElementById("Number").textContent = longT[0].split(".")[0];
                        document.getElementById("Number").setAttribute('text-anchor', 'middle');
                        document.getElementById("Number").setAttribute('y', '21');
                        document.getElementById("Number").setAttribute('x', '125');

                        document.getElementById("Circle").style.opacity = "1";

                        break;

                    case 2:
                        document.getElementById("Title3").textContent = "";

                        document.getElementById("Title1").textContent = (longT[0]).replace(/[0-9]/g, '').replace('. ', '');
                        document.getElementById("Title1").setAttribute('text-anchor', 'middle');
                        document.getElementById("Title1").setAttribute('y', '60');
                        document.getElementById("Title1").setAttribute('x', '125');

                        document.getElementById("Title2").textContent = (longT[1]);
                        document.getElementById("Title2").setAttribute('text-anchor', 'middle');
                        document.getElementById("Title2").setAttribute('y', '80');
                        document.getElementById("Title2").setAttribute('x', '125');

                        document.getElementById("Number").textContent = longT[0].split(".")[0];
                        document.getElementById("Number").setAttribute('text-anchor', 'middle');
                        document.getElementById("Number").setAttribute('y', '21');
                        document.getElementById("Number").setAttribute('x', '125');

                        document.getElementById("Circle").style.opacity = "1";

                        break;

                    case 3:


                        document.getElementById("Title1").textContent = (longT[0]).replace(/[0-9]/g, '').replace('. ', '');;
                        document.getElementById("Title1").setAttribute('text-anchor', 'middle');
                        document.getElementById("Title1").setAttribute('y', '45');
                        document.getElementById("Title1").setAttribute('x', '125');

                        document.getElementById("Title2").textContent = (longT[1]);
                        document.getElementById("Title2").setAttribute('text-anchor', 'middle');
                        document.getElementById("Title2").setAttribute('y', '62');
                        document.getElementById("Title2").setAttribute('x', '125');

                        document.getElementById("Title3").textContent = (longT[2]);
                        document.getElementById("Title3").setAttribute('text-anchor', 'middle');
                        document.getElementById("Title3").setAttribute('y', '80');
                        document.getElementById("Title3").setAttribute('x', '125');

                        document.getElementById("Number").textContent = longT[0].split(".")[0];
                        document.getElementById("Number").setAttribute('text-anchor', 'middle');
                        document.getElementById("Number").setAttribute('y', '21');
                        document.getElementById("Number").setAttribute('x', '125');

                        document.getElementById("Circle").style.opacity = "1";

                        break;

                }




                var myChildren = p.children;
                //myChildren.forEach(element => console.log(element.data.color));
                myChildren.forEach(element => {



                    switch (element.data.color.toUpperCase()) {
                        case "#226159":
                            document.getElementById("ser1").style.opacity = "0";
                            break;

                        case "#00857C":
                            document.getElementById("ser2").style.opacity = "1";
                            break;

                        case "#00A09A":
                            document.getElementById("ser3").style.opacity = "1";
                            break;

                        case "#5BB7AC":
                            document.getElementById("ser4").style.opacity = "1";
                            break;

                        case "#8FD2C8":
                            document.getElementById("ser5").style.opacity = "1";
                            break;


                        case "#FCC40F":
                            document.getElementById("ser6").style.opacity = "1";
                            break;

                        case "#BFBFBF":
                            document.getElementById("ser7").style.opacity = "1";
                            break;

                        default:
                            break;

                    }

                });
            }




            // document.getElementById("Title").textContent="";




            //document.getElementById("Title").setAttribute('transform-x','50%');


            //document.getElementById("Title").text(p.data.name.toUpperCase().split("!")[0]);


            //$("#Title").text(p.data.name);
            /*
               svg
            .append("text")
            .text(d.current)
            .style("fill", "black")
                .attr("x", width / 2 )
                .attr("y", width / 2 );*/


            parent.datum(p.parent || root);



            root.each(d => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            })


            const t = g.transition().duration(750);

            // Transition the data on all arcs, even the ones that arenâ€™t visible,
            // so that if this transition is interrupted, entering arcs will start
            // the next transition from the desired position.
            path.transition(t)
                .tween("data", d => {

                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);


                })
                .filter(function(d) {
                    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
                .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 1 : 1) : 0)
                .attrTween("d", d => () => arc(d.current));


            label.filter(function(d) {
                    return +this.getAttribute("fill-opacity") || labelVisible(d.target);
                }).transition(t)
                .attr("fill-opacity", d => +labelVisible(d.target))
                .attrTween("transform", d => () => labelTransform(d.current))

        }

        /*
          //mouse over
  const totalSize = d=>root.descendants()[0].value;
 
        function mouseover(d) {
          var sequenceArray = d.ancestors().reverse();
          sequenceArray.shift(); // remove root node from the array
          // Fade all the segments.
          d3.selectAll("path").style("opacity", 0.5);
        }
        //mouse leave
        // Restore everything to full opacity when moving off the visualization.

        function mouseleave(d) {
          // Deactivate all segments during transition.
          //d3.selectAll("path").on("mouseover", null);

          // Transition each segment to full opacity and then reactivate it.
          d3.selectAll("path")
            .transition()
            .duration(100)
            .style("opacity", 1)
            .on("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });
        }
      
   */
        //mouse over
        const totalSize = root.descendants()[0].value;

        function mouseover(d) {
            var sequenceArray = d.descendants();

            //sequenceArray.shift(); // remove root node from the array
            // Fade all the segments.
            d3.selectAll("path").style("opacity", 1);

            // Then highlight only those that are an ancestor of the current segment.
            g.selectAll("path")
                .filter(function(node) {
                    return sequenceArray.indexOf(node) >= 0;
                })
                .style("opacity", 1);
        }
        //mouse leave
        // Restore everything to full opacity when moving off the visualization.
        function mouseleave(d) {
            // Deactivate all segments during transition.
            //d3.selectAll("path").on("mouseover", null);

            // Transition each segment to full opacity and then reactivate it.
            d3.selectAll("path")
                .transition()
                .duration(100)
                .style("opacity", 1)
                .on("end", function() {
                    d3.select(this).on("mouseover", mouseover);
                });
        }


        function arcVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }

        function labelVisible(d) {
            return d.y1 <= 2 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        function labelTransform(d) {


            const x = ((d.x0 + d.x1) / 2 * 180 / Math.PI) + 1;
            const y = (d.y0 + d.y1) / 2 * radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }

        return svg.node();
    });
    main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment) {
        return (
            FileAttachment("flare-2.json").json()
        )
    });
    main.variable(observer("partition")).define("partition", ["d3"], function(d3) {
        return (
            data => {

                const root = d3.hierarchy(data)
                    .sum(d => d.value)
                    .sort((a, b) => b.name - a.name)

                return d3.partition()
                    .size([2 * Math.PI, root.height + 1])
                    (root);

            }
        )
    });
    main.variable(observer("color")).define("color", ["d3", "data"], function(d3, data) {
        return (
            d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
        )
    });
    main.variable(observer("format")).define("format", ["d3"], function(d3) {
        return (
            d3.format(",d")
        )
    });
    main.variable(observer("width")).define("width", function() {
        return (
            932
        )
    });
    main.variable(observer("radius")).define("radius", ["width"], function(width) {
        return (
            width / 6
        )
    });
    main.variable(observer("arc")).define("arc", ["d3", "radius"], function(d3, radius) {
        return (
            d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(radius * 1.5)
            .innerRadius(d => d.y0 * radius)
            .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

        )
    });
    main.variable(observer("d3")).define("d3", ["require"], function(require) {
        return (
            require("d3@5")
        )
    });
    return main;
}
