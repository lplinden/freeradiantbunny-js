/**
 * Module Timecards.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Timecards() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("timecards instantiated", instanceCount);
    this.name = "timecards";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];    
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("timecards idOrNoId =", idOrNoId);
	debug("timecards classNameFilter =", classNameFilter);
        debug("timecards paramSort =", paramSort);
        debug("timecards specialFlag =", specialFlag);
        debug("timecards queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.id";
            debug("timecards orderBy =", orderBy);
	    sql = "select z.id, z.description, z.date_in, z.time_in, z.date_out, z.time_out from timecards z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Timecards();

// end
