
let peopleModel=require("../models/peopleModel")


const limit_ = 2;

exports.index = async function (req, res) {
    let aggregate_options = [];

    //PAGINATION
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || limit_;

    //set the options for pagination
    const options = {
        page, limit,
        customLabels: {
            totalDocs: 'totalResults',
            docs: 'peoples'
        }
    };

    //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
    let match = {};

    //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
    if (req.query.firstname) match.firstName = {$regex: req.query.firstname, $options: 'i'};
    if (req.query.age) match.age = {$gte: 18};

    // //filter by date
    // if (req.query.date) {
    //     let d = moment(req.query.date);
    //     let next_day = moment(d).add(1, 'days'); // add 1 day

    //     match.start_date = {$gte: new Date(d), $lt: new Date(next_day)};
    // }

    aggregate_options.push({$match: match});

    //GROUPING -- SECOND STAGE
    if (req.query.group !== 'false' && parseInt(req.query.group) !== 0) {
        let group = {
            _id: "$lastName",
            data: {$push: "$$ROOT"}
        };

        aggregate_options.push({$group: group});
    }

    //SORTING -- THIRD STAGE
    let sortOrder = req.query.sort_order && req.query.sort_order === 'desc' ? -1 : 1;
    if (req.query.group !== 'false' && parseInt(req.query.group) !== 0) {
        aggregate_options.push({$sort: {"data.lastName": sortOrder}});
   }
    else
        aggregate_options.push({$sort: {"age": sortOrder}});
   

    //LOOKUP/JOIN -- FOURTH STAGE
    // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

    // Set up the aggregation
    const myAggregate = peopleModel.aggregate(aggregate_options);
    const result = await peopleModel.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
};