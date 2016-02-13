const csjs = require('../');

module.exports = csjs`
  /* Here's a comment */
  /*squishedcomment*/
  /********crazycomment********/
  /* A comment with a period at the end. */
  /* A comment with a period followed by numbers v1.2.3 */
  /* A comment with a .className */
  /*
   * Here's a comment
   * A comment with a period at the end.
   * A comment with a period followed by numbers v1.2.3
   * A comment with a .className
   */
  /* .inlineCss { color: red; } */
  /*
  .commentedOutCss {
    color: blue;
  }
  */
  .foo {
    color: red; /* comment on a line */
    animation-name: wow;
  }

  @keyframes wow {}

  /*
  @keyframes bam {}
   */
  
  /* .woot {
    animation-name: bam;
  } */

  /* .hmm {
    animation-name: wow;
  } */

`;
