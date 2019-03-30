var RelevanceEnum = Object.freeze({
    "FullName":100,
    "OtherNames":5,
    "Substring":1
});

class Autocomplete {
    _trie;

    constructor(terms) {
        this._createTrie(terms);
    }

    _createTrie(terms) {
        this._trie = new Trie();
        for (var i in terms) {
            this._trie.addKey(terms[i]);
        }
        this.loadWordsFromArr(terms);
    }

    getSuggestions(word) {
        word = word.toLowerCase();
        var node = this._trie.find(word);
        if (node != null) {
            return node._suggestions.get();
        }
        return [];
    }

    _getAllSubstringsMinSize(str,size) {
        var i, j, result = [];
        size = (size || 0);
        for (i = 0; i < str.length; i++) {
            for (j = str.length; j-i>=size; j--) {
                result.push(str.slice(i, j));
            }
        }
        return result;
      }

    // loads all possible keys for each word in arr
    loadWordsFromArr(arr) {
        if (arr === null || arr.length === 0) return;
        for (var i in arr) {
            var fullname = arr[i];
            // full name (ex: "le" matches "LeBron James" but not "Alex Len")
            this._trie.addKey(fullname, fullname, RelevanceEnum.FullName);

            // any word in name (ex: "james" will match "LeBron James")
            var arrKeys = fullname.split(" ");
            for (var j in arrKeys)
            {
                var key = arrKeys[j];
                this._trie.addKey(fullname, key, RelevanceEnum.OtherNames);

                // substring matches for each word in name (ex: "ame" will match "LeBron James"
                // but "n J" and "nJ" will not match "LeBron James")
                var substrings = this._getAllSubstringsMinSize(key, 1);
                for (var k in substrings) {
                    this._trie.addKey(fullname, substrings[k], 100-key.length);
                }
            }
            
            //todo: edit distance
        }
    }
}