// for O(n) inserts and minimal O(n) access
// inserts keep the array sorted in descending order
class RelevanceArray {
    arr; // the underlying data structure: an array
    _maxSize;

    constructor(maxSize = 5) {
        this.arr = [];
        this._maxSize = maxSize;
    }

    _findIndex(data) {
        return this._findIndexRecurse(data, 0, this.arr.length);
    }

    _findIndexRecurse(data, l, r) {
        if (l >= r) return l;
        var m = parseInt(l+(r-l)/2);
        if (data.relevance > this.arr[m].relevance) {
            return this._findIndexRecurse(data, l, m-1);
        }
        else if (data.relevance < this.arr[m].relevance) {
            return this._findIndexRecurse(data, m+1, r);
        }
        return m;
    }

    _findWord(data) {
        //console.log(this.arr.filter(e => (e.word === data)));
        return this.arr.filter(e => (e.word === data));
    }

    // finds the index to insert the data at
    // inserts the data in O(n) time
    add(data) {
        var index = this._findIndex(data);
        if (this._findWord(data).length > 0) {
            console.log('removing word', data);
            if (this.arr[index].relevance === data.relevance) return;
            this.arr.splice(index, 1);
        }
        this.arr.splice(index, 0, data);
    }

    get() {
        var includedSet = new Set();
        var retArr = [];
        var i = 0;
        //console.log(JSON.stringify(this.arr));
        this.arr = this.arr.sort(
            function(a, b) {          
               if (a.relevance !== b.relevance) {
                  // Price is only important when cities are the same
                  return b.relevance - a.relevance;
               }
               return a.word > b.word ? 1 : -1;
            });

        while (i < this.arr.length) {
            if (includedSet.has(this.arr[i].word)) {
                i++;
                continue;
            }
            includedSet.add(this.arr[i].word);
            //console.log(JSON.stringify(retArr));
            retArr.push(this.arr[i]);
            i++;
        }
        return retArr;
    }
}