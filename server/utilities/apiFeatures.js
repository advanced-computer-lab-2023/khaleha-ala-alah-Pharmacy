class APIFeatures{
    constructor(query,queryString) {
        this.query = query;
        this.queryString =queryString;
        
    }
    filter(){
        //build query
        //1- filtering
        const queryObj = { ...this.queryString };
        const execludeObj = ['page','sort','limit','fields'];
        execludeObj.forEach(el=>delete queryObj[el])


        //2- advanced filtering
        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gte|lte|gt|lt)\b/g,match => `$${match}`) // if found gte,lte,lt,gt then replace it with $ and word
        this.query.find(JSON.parse(queryString));
        return this; // to return entire object to get access to next method
    }
    sort(){
        // 3- sorting
        if(this.queryString.sort){
            const sortby = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortby)
        }
        else{
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    limitFields(){
        // 4- fields limiting
        if(this.queryString.fields){
            this.query = this.query.select(this.queryString.fields.split(',').join(' '));
        }
        else{
            this.query = this.query.select('-__v');
        }
        return this;
    }
    paginate(){
        // 5- pagination
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page-1) * limit;
        //page=2&limit=10   1-10 page 1   11-20 page 2
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

}
module.exports = APIFeatures