/**
 * @file
 * Custom scripts.
 */
var defaultValue = 100000;
var formater = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
});

(function($, Drupal, drupalSettings) {
  Drupal.behaviors.d8base = {
    attach: function(context, settings) {
      var chart_name = drupalSettings.chart_name;
      var chart_number = drupalSettings.chart_number;
      var chart_color = drupalSettings.chart_color;
      var target_return = drupalSettings.target_return;
      var projected_value = drupalSettings.projected_values;
      var initalValue = defaultValue;
      var values = [];
      values.push(initalValue);
      var i;
      for(i=0;i<20;i++){
      initalValue = initalValue * (1 + target_return / 100);
      values.push(Math.round(initalValue));
      }

      //pie chart
      var config = {
        type: "pie",
        data: {
          datasets: [
            {
              data: chart_number,
              backgroundColor: chart_color,
              label: ""
            }
          ],
          labels: chart_name
        },
        options: {
          responsive: true,
          showTooltips: false,
          events: false,
          animation: {
            duration: 500,
            easing: "easeOutQuart",
            onComplete: function() {
              var ctx = this.chart.ctx;
              ctx.font = "18px Verdana";
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";
              this.data.datasets.forEach(function(dataset) {
                for (var i = 0; i < dataset.data.length; i++) {
                  var model =
                      dataset._meta[Object.keys(dataset._meta)[0]].data[i]
                        ._model,
                    total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                    mid_radius =
                      model.innerRadius +
                      (model.outerRadius - model.innerRadius) / 1.2,
                    mid_radius2 =
                      model.innerRadius +
                      (model.outerRadius - model.innerRadius) / 1.4,
                    start_angle = model.startAngle,
                    end_angle = model.endAngle,
                    mid_angle = start_angle + (end_angle - start_angle) / 2;
                  if (i % 2 == 0) {
                    var x = mid_radius * Math.cos(mid_angle);
                    var y = mid_radius * Math.sin(mid_angle);
                  } else {
                    var x = mid_radius2 * Math.cos(mid_angle);
                    var y = mid_radius2 * Math.sin(mid_angle);
                  }

                  ctx.fillStyle = "#fff";
                  ctx.fillText(dataset.data[i] + "%", model.x + x, model.y + y);
                }
              });
            }
          },
          elements: {
            arc: {
              borderWidth: 0
            }
          },
          legend: {
            position: "bottom",
            fullWidth: true,
            display: false,
            onClick: e => e.stopPropagation(),
            labels: {
              boxWidth: 20,
              fontSize: 20,
              padding: 25,
              generateLabels: function(chart) {
                var data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map(function(label, i) {
                    var meta = chart.getDatasetMeta(0);
                    var arc = meta.data[i];
                    var ds = data.datasets[0];
                    var custom = (arc && arc.custom) || {};
                    var getValueAtIndexOrDefault =
                      Chart.helpers.getValueAtIndexOrDefault;
                    var arcOpts = chart.options.elements.arc;
                    var value =
                      chart.config.data.datasets[arc._datasetIndex].data[
                        arc._index
                      ];
                    var fill = custom.backgroundColor
                      ? custom.backgroundColor
                      : getValueAtIndexOrDefault(
                          ds.backgroundColor,
                          i,
                          arcOpts.backgroundColor
                        );
                    return {
                      text: label,
                      fillStyle: fill,
                      index: i
                    };
                  });
                } else {
                  return [];
                }
              }
            }
          }
        }
      };
      //line chart
      var xx = ['', '1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10 years', '11 years', '12 years', '13 years', '14 years', '15 years', '16 years', '17 years', '18 years', '19 years', '20 years'];
      var yy = projected_value || [];
      var yya = [];
      var yyb = [];
      var yyaa = [];
      var yybb = [];
      var stepValue = 1500;
      var intervel = 0;
      var intervel2 = 0;
      var myImage = new Image();
      myImage.src = "Capture.jpg"
      for (i = 0; i < yy.length; i++) {
        if (i != 0) {
          intervel += stepValue;
          intervel2 += stepValue - 750;
        }
        yya[i] = yy[i] + intervel;
        yyb[i] = yy[i] - intervel;
        yyaa[i] = yya[i] + intervel2;
        yybb[i] = yyb[i] - intervel2;
      }
      Chart.defaults.LineWithLine = Chart.defaults.line;
      Chart.controllers.LineWithLine = Chart.controllers.line.extend({
        draw: function (ease) {
          Chart.controllers.line.prototype.draw.call(this, ease);

          if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0],
                    ctx = this.chart.ctx,
                    x = activePoint.tooltipPosition().x,
                    topY = this.chart.scales['y-axis-0'].top,
                    bottomY = this.chart.scales['y-axis-0'].bottom;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY + 80);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 0;
            ctx.strokeStyle = '#000';
            ctx.stroke();
            ctx.restore();
          }
        }
      });
      lindex = 0;
      rindex = 9;
      var config1 = {
        type: 'LineWithLine',
        data: {
          labels: getXXvalue(xx, lindex, rindex),
          datasets: [{
              borderColor: '#b6ff62',
              data: getXXvalue(yy, lindex, rindex),
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#000',
              fill: false,
              borderDash: [5],
              pointHoverRadius: 10,
            },
            {
              backgroundColor: '#e5ffc7',
              borderColor: '#e5ffc7',
              data: getXXvalue(yya, lindex, rindex),
              fill: '2',
              borderWidth: 0,
              pointHoverRadius: 0,
            },
            {
              backgroundColor: '#f2ffe3',
              borderColor: '#f2ffe3',
              data: getXXvalue(yyb, lindex, rindex),
              fill: '4',
              borderWidth: 0,
              pointHoverRadius: 0,
            },
            {
              backgroundColor: '#f2ffe3',
              borderColor: '#fff',
              data: getXXvalue(yyaa, lindex, rindex),
              fill: '1',
              borderWidth: 0,
              pointHoverRadius: 0,
            },
            {
              borderColor: '#fff',
              data: getXXvalue(yybb, lindex, rindex),
              fill: false,
              borderWidth: 0,
              pointHoverRadius: 0,
            }
          ]
        },
        options: {
          responsive: false,
          title: {
            display: false,
            text: 'Chart.js Line Chart'
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
            mode: 'index',
            intersect: false,
            yAlign: 'center',
            xAlign: 'right',
            filter: function (tooltipItem) {
              return tooltipItem.datasetIndex === 0;
            },
            custom: function (tooltip) {
              // Tooltip Element
              var tooltipEl = $('#chartjs-tooltip');
              if (!tooltipEl[0]) {
                $('body').append('<div id="chartjs-tooltip"><div class="title">Projected Value</div><div class="value"></div></div>');
                tooltipEl = $('#chartjs-tooltip');
              }
              // Hide if no tooltip
              if (!tooltip.opacity) {
                tooltipEl.css({
                  opacity: 0
                });
                $('#linechart').each(function (index, el) {
                  $(el).css('cursor', 'default');
                });
                return;
              }
              $(this._chart.canvas).css('cursor', 'pointer');
              // Set caret Position
              tooltipEl.removeClass('above below no-transform');
              if (tooltip.yAlign) {
                tooltipEl.addClass(tooltip.yAlign);
              } else {
                tooltipEl.addClass('no-transform');
              }
              // Set Text
              if (tooltip.body) {
                var value = tooltip.body.pop().lines.pop();
                var innerHtml = [
                  '$' + parseInt(value).toLocaleString('en-IN', {style: 'decimal', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0})
                ];
                tooltipEl.find('.value').html(innerHtml.join('\n'));
              }
              // Find Y Location on page
              var top = 0;
              var position = $(this._chart.canvas)[0].getBoundingClientRect();
              // Display, position, and set styles for font
              tooltipEl.css({
                opacity: 1,
                width: 'auto',
                left: tooltip.x + 'px',
                top: '0px',
                fontFamily: tooltip._fontFamily,
                fontSize: tooltip.fontSize,
                fontStyle: tooltip._fontStyle,
              });
            },
          },
          hover: {
            mode: 'index',
            intersect: false,
          },
          elements: {
            point: {
              radius: 0,
            },
            line: {
              fill: '2'
            }
          },
          plugins: {
            filler: {
              propagate: false
            }
          },
          scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                  display: true
                },
                gridLines: {
                  drawOnChartArea: false
                }
              }],
            yAxes: [{
                display: true,
                scaleLabel: {
                  display: true
                },
                ticks: {
                  min: yybb[lindex] - (yybb[lindex] % 10000),
                  max: yyaa[rindex - 1] + (10000 - yyaa[rindex - 1] % 10000),
                  stepSize: 10000
                },
                gridLines: {
                  drawOnChartArea: false
                }
              }]
          }
        }
      };
        var canvas = document.getElementById("piechart");
        if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
          var ctx1 = document.getElementById("linechart").getContext("2d");
          window.myLine = new Chart(ctx1, config1);
          window.myPie = new Chart(ctx, config);
          renderPieLegend();
        }

      function renderPieLegend() {
        var legend = '';
        var color = config.data.datasets[0].backgroundColor;
        var label = config.data.labels;
        for(i=0;i<color.length;i++){
          legend += '<li><span class="color" style="background-color:'+color[i]+'"></span><span class="title">'+label[i]+'</span></li>';
        }
        jQuery('.pie-legend ul').html(legend);
        jQuery("#progress-bar").hide();
        jQuery("#block-q8-tur-branding").hide();
        jQuery("#block-useraccountmenutur").hide();
        jQuery(".sh--back").hide();
        jQuery("#main #content section").removeClass("questionnaire");
        jQuery("#main #content .section div").removeClass("page-frame");
      }
      function getXXvalue(target, from = 0, to = 9) {
        return target.slice(from, to);
      }
      jQuery(document).on('click', '.actions-buttons .right', function () {
        if (rindex >= 21) {
          return;
        }
        lindex += 1;
        rindex += 1;
        config1.data.labels = getXXvalue(xx, lindex, rindex); // remove the label first
        config1.data.datasets[0].data = getXXvalue(yy, lindex, rindex);
        config1.data.datasets[1].data = getXXvalue(yya, lindex, rindex);
        config1.data.datasets[2].data = getXXvalue(yyb, lindex, rindex);
        config1.data.datasets[3].data = getXXvalue(yyaa, lindex, rindex);
        config1.data.datasets[4].data = getXXvalue(yybb, lindex, rindex);
        config1.options.scales.yAxes[0].ticks.min = yybb[lindex] - (yybb[lindex] % 10000);
        config1.options.scales.yAxes[0].ticks.max = yyaa[rindex - 1] + (10000 - yyaa[rindex - 1] % 10000);
        window.myLine.update();
      });
      jQuery(document).on('click', '.actions-buttons .left', function () {
        if (lindex <= 0) {
          return;
        }
        lindex -= 1;
        rindex -= 1;
        config1.data.labels = getXXvalue(xx, lindex, rindex); // remove the label first
        config1.data.datasets[0].data = getXXvalue(yy, lindex, rindex);
        config1.data.datasets[1].data = getXXvalue(yya, lindex, rindex);
        config1.data.datasets[2].data = getXXvalue(yyb, lindex, rindex);
        config1.data.datasets[3].data = getXXvalue(yyaa, lindex, rindex);
        config1.data.datasets[4].data = getXXvalue(yybb, lindex, rindex);
        config1.options.scales.yAxes[0].ticks.min = yybb[lindex] - (yybb[lindex] % 10000);
        config1.options.scales.yAxes[0].ticks.max = yyaa[rindex - 1] + (10000 - yyaa[rindex - 1] % 10000);
        window.myLine.update();
      });
      var incrementValue = 5000;
      jQuery(".initial-investment .increment", context).click(function() {
        var input = jQuery(this)
          .parents(".input-group")
          .find("input");
        var value =
          Number(
            input
              .val()
              .replace("$", "")
              .replace(/\./g, "")
          ) + incrementValue;
        input.val(formater.format(value).replace(/,/g, "."));
        var stepValue = 1500;
        var intervel = 0;
        var intervel2 = 0;
        var yy = projected_value;
        for (i = 0; i < yy.length; i++) {
          yy[i] = yy[i] + incrementValue;
          if (i != 0) {
            intervel += stepValue;
            intervel2 += stepValue - 750;
          }
          yya[i] = yy[i] + intervel;
          yyb[i] = yy[i] - intervel;
          yyaa[i] = yya[i] + intervel2;
          yybb[i] = yyb[i] - intervel2;
        }
        config1.data.labels = getXXvalue(xx, 0, 9);
        config1.data.datasets[0].data = getXXvalue(yy, 0, 9);
        config1.data.datasets[1].data = getXXvalue(yya, 0, 9);
        config1.data.datasets[2].data = getXXvalue(yyb, 0, 9);
        config1.data.datasets[3].data = getXXvalue(yyaa, 0, 9);
        config1.data.datasets[4].data = getXXvalue(yybb, 0, 9);
        config1.options.scales.yAxes[0].ticks.min = yybb[0] - (yybb[0] % 10000);
        config1.options.scales.yAxes[0].ticks.max =
          yyaa[9 - 1] + (10000 - (yyaa[9 - 1] % 10000));
        window.myLine.update();
      });

      jQuery(".initial-investment .decrement", context).click(function() {
          var input = jQuery(this)
            .parents(".input-group")
            .find("input");
          if (
            Number(
              input
                .val()
                .replace("$", "")
                .replace(/\./g, "")
            ) > incrementValue
          ) {
            var value =
              Number(
                input
                  .val()
                  .replace("$", "")
                  .replace(/\./g, "")
              ) - incrementValue;
            input.val(formater.format(value).replace(/,/g, "."));
            var stepValue = 1500;
            var intervel = 0;
            var intervel2 = 0;
            yy = projected_value;
            for (i = 0; i < yy.length; i++) {
              yy[i] = yy[i] - incrementValue;
              if (i != 0) {
                intervel += stepValue;
                intervel2 += stepValue - 750;
              }
              yya[i] = yy[i] + intervel;
              yyb[i] = yy[i] - intervel;
              yyaa[i] = yya[i] + intervel2;
              yybb[i] = yyb[i] - intervel2;
            }
            config1.data.labels = getXXvalue(xx, 0, 9);
            config1.data.datasets[0].data = getXXvalue(yy, 0, 9);
            config1.data.datasets[1].data = getXXvalue(yya, 0, 9);
            config1.data.datasets[2].data = getXXvalue(yyb, 0, 9);
            config1.data.datasets[3].data = getXXvalue(yyaa, 0, 9);
            config1.data.datasets[4].data = getXXvalue(yybb, 0, 9);
            config1.options.scales.yAxes[0].ticks.min =
              yybb[0] - (yybb[0] % 10000);
            config1.options.scales.yAxes[0].ticks.max =
              yyaa[9 - 1] + (10000 - (yyaa[9 - 1] % 10000));
            window.myLine.update();
          }
        }
      );

    }
  };

})(jQuery, Drupal, drupalSettings);


