import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  source: computed(() => []),
  size: 25,
  page: 1,
  spread: 2,

  lastPage: computed('source.[]', 'size', function() {
    return Math.ceil(this.get('source.length') / this.get('size'));
  }),

  pageLinks: computed('page', 'spread', function() {
    const { spread, page, lastPage } = this.getProperties('spread', 'page', 'lastPage');

    // When there is only one page, don't bother with page links
    if (lastPage === 1) {
      return [];
    }

    const lowerBound = Math.max(1, page - spread);
    const upperBound = Math.min(lastPage, page + spread) + 1;

    return Array(upperBound - lowerBound).fill(null).map((_, index) => ({
      pageNumber: lowerBound + index,
    }));
  }),

  list: computed('source.[]', 'page', 'size', function() {
    const size = this.get('size');
    const start = (this.get('page') - 1) * size;
    return this.get('source').slice(start, start + size);
  }),
});
