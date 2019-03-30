class TrieNode {
    _data;
    _isWord;
    _children;
    _suggestions;
    _relevance;

    constructor(data){
        this._data = data;
        this._isWord = false;
        this._children = {};
        this._suggestions = new RelevanceArray();
        this._relevance = 1;
    }
}

class Trie {
    _root;
    _numSuggestions;

    constructor(numSuggestions = 5) {
        this._root = new TrieNode('');
        this._numSuggestions = numSuggestions;
    }

    addKey(word, key, relevance = 1) {
        if (!this._root) return null;
        this._addNode(this._root, word, key, 0, relevance);
    }

    _addNode(node, word, key, index, relevance) {
        if (!node || index >= key.length) return null;

        var letter = key.charAt(index).toLowerCase();
        var child = node._children[letter];
        if (!child) {
            child = new TrieNode(letter);
            node._children[letter] = child;
        }

        child._suggestions.add({'word': word, 'relevance': relevance});

        // found the end node
        if (key.length-1 == index) {
            child.isWord = true;
            return;
        }

        this._addNode(child, word, key, index+1, relevance);
    }

    find(word) {
        var node = this._root;
        var found = true;
        for (const letter of word) {
            if (node._children[letter]) {
                node = node._children[letter];
            }
            else {
                found = false;
                break;
            }
        }
        return found ? node : null;
    }

    printByLevel() {
        if(!this._root) {
            return console.log('No root node found');
        }

        var newline = new TrieNode('\n');
        var queue = [this._root, newline];
        var string = '';

        while(queue.length) {
            var node = queue.shift();
            string += node._data.toString() + (node._data !== '\n' ? ' ' : '');
            if(node === newline && queue.length) {
                queue.push(newline);
            }
            for(var child in node._children) {
                if(node._children.hasOwnProperty(child)) {
                    queue.push(node._children[child]);
                }
            }
        }
        //console.log(string.trim());
    }

}