import distanceInWords from 'date-fns/distance_in_words'

class PostModel {
    id
    timestamp
    title
    body
    author
    category
    vote_score
    created_at
    created_by
    updated_at
    updated_by

    constructor(props = {}) {
        for (var value of Object.keys(props)) {
            this[value] = props[value]
        }
    }

    get date() {
        return distanceInWords(this.created_at, new Date())
    }

    get votes() {
        const signal = this.vote_score > 0 ? '+ ' : '';
        const pluralize = (this.vote_score <= 1 && this.vote_score >= -1) ? " vote" : " votes"
        return signal + this.vote_score + pluralize
    }
}

export default PostModel