var ss = require('simple-statistics');
var inside = require('turf-inside');

/**
* Takes a set of polygons, a set of points, and tag polygons with the variance
* of point property values contained within.
*
* @module turf/variance
* @param {FeatureCollection} polygons a FeatureCollection of {@link Polygon} features
* @param {FeatureCollection} points a FeatureCollection of {@link Point} features
* @param {string} inField the field in input data to analyze
* @param {string} outField the field in which to store results
* @return {FeatureCollection} a FeatureCollection of {@link Polygon} features
* with properties listed as `outField` values in `aggregations`
* @example
* var polygons = turf.featurecollection([
*   turf.polygon([[[0,0],[10,0],[10,10],[0,10],[0,0]]]),
*   turf.polygon([[[10,0],[20,10],[20,20], [20,0]]])]);
* var points = turf.featurecollection([
*   turf.point(5,5, {population: 200}),
*   turf.point(1,3, {population: 600}),
*   turf.point(14,2, {population: 100}),
*   turf.point(13,1, {population: 200}),
*   turf.point(19,7, {population: 300})]);
* var aggregated = turf.variance(polygons, points, 'population', 'variance');
* //=polygons
* //=points
* //=aggregated
*/
module.exports = function (polyFC, ptFC, inField, outField) {
  polyFC.features.forEach(function(poly){
    if(!poly.properties){
      poly.properties = {};
    }
    var values = [];
    ptFC.features.forEach(function(pt){
      if (inside(pt, poly)) {
        values.push(pt.properties[inField]);
      }
    });
    poly.properties[outField] = ss.variance(values);
  });

  return polyFC;
};
