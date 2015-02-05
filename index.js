var ss = require('simple-statistics');
var inside = require('turf-inside');

/**
* Calculates the variance value of a field for {@link Point} features within a set of {@link Polygon} features.
*
* @module turf/variance
* @category aggregation
* @param {FeatureCollection} polygons a FeatureCollection of {@link Polygon} features
* @param {FeatureCollection} points a FeatureCollection of {@link Point} features
* @param {string} inField the field in input data to analyze
* @param {string} outField the field in which to store results
* @return {FeatureCollection} a FeatureCollection of {@link Polygon} features
* with properties listed as `outField`
* @example
* var polygons = turf.featurecollection([
*   turf.polygon([[
*     [-97.414398, 37.684092],
*     [-97.414398, 37.731353],
*     [-97.332344, 37.731353],
*     [-97.332344, 37.684092],
*     [-97.414398, 37.684092]
*   ]]),
*   turf.polygon([[
*     [-97.333717, 37.606072],
*     [-97.333717, 37.675397],
*     [-97.237586, 37.675397],
*     [-97.237586, 37.606072],
*     [-97.333717, 37.606072]
*   ]])
* ]);
* var points = turf.featurecollection([
*   turf.point([-97.401351, 37.719676], {population: 200}),
*   turf.point([-97.355346, 37.706639], {population: 600}),
*   turf.point([-97.387962, 37.70012], {population: 100}),
*   turf.point([-97.301788, 37.66507], {population: 200}),
*   turf.point([-97.265052, 37.643325], {population: 300})]);
*
* var aggregated = turf.variance(
*   polygons, points, 'population', 'variance');
*
* var result = turf.featurecollection(
*   points.features.concat(aggregated.features));
*
* //=result
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
