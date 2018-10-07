import request from 'request';

import {
  GET_COLLECTIONS_REQUEST,
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAILURE
} from '../../constants/actionTypes';

export const getCollections = () => async dispatch => {
  dispatch({ type: GET_COLLECTIONS_REQUEST });
  try {

    var options = { method: 'POST',
      url: 'http://35.192.232.199/my-data-medical/graphql',
      headers:
       {
         connection: 'keep-alive',
         referer: 'http://35.192.232.199/my-data-medical?query=%23%20Welcome%20to%20GraphiQL%0A%23%0A%23%20GraphiQL%20is%20an%20in-browser%20tool%20for%20writing%2C%20validating%2C%20and%0A%23%20testing%20GraphQL%20queries.%0A%23%0A%23%20Type%20queries%20into%20this%20side%20of%20the%20screen%2C%20and%20you%20will%20see%20intelligent%0A%23%20typeaheads%20aware%20of%20the%20current%20GraphQL%20type%20schema%20and%20live%20syntax%20and%0A%23%20validation%20errors%20highlighted%20within%20the%20text.%0A%23%0A%23%20GraphQL%20queries%20typically%20start%20with%20a%20%22%7B%22%20character.%20Lines%20that%20starts%0A%23%20with%20a%20%23%20are%20ignored.%0A%23%0A%23%20An%20example%20GraphQL%20query%20might%20look%20like%3A%0A%23%0A%23%20%20%20%20%20%7B%0A%23%20%20%20%20%20%20%20field(arg%3A%20%22value%22)%20%7B%0A%23%20%20%20%20%20%20%20%20%20subField%0A%23%20%20%20%20%20%20%20%7D%0A%23%20%20%20%20%20%7D%0A%23%0A%23%20Keyboard%20shortcuts%3A%0A%23%0A%23%20%20Prettify%20Query%3A%20%20Shift-Ctrl-P%20(or%20press%20the%20prettify%20button%20above)%0A%23%0A%23%20%20%20%20%20%20%20Run%20Query%3A%20%20Ctrl-Enter%20(or%20press%20the%20play%20button%20above)%0A%23%0A%23%20%20%20Auto%20Complete%3A%20%20Ctrl-Space%20(or%20just%20start%20typing)%0A%23%0A%7B%0A%20%20records%20%7B%0A%20%20%20%20datahash%0A%20%20%20%20metadata%0A%20%20%20%20owner%0A%20%20%7D%0A%7D%0A',
         accept: 'application/json',
         'content-type': 'application/json',
         'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3567.0 Safari/537.36',
         'accept-language': 'en-US,en;q=0.9',
         'accept-encoding': 'gzip, deflate',
         origin: 'http://35.192.232.199' },
      body:
       { query: '# Welcome to GraphiQL\n#\n# GraphiQL is an in-browser tool for writing, validating, and\n# testing GraphQL queries.\n#\n# Type queries into this side of the screen, and you will see intelligent\n# typeaheads aware of the current GraphQL type schema and live syntax and\n# validation errors highlighted within the text.\n#\n# GraphQL queries typically start with a "{" character. Lines that starts\n# with a # are ignored.\n#\n# An example GraphQL query might look like:\n#\n#     {\n#       field(arg: "value") {\n#         subField\n#       }\n#     }\n#\n# Keyboard shortcuts:\n#\n#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)\n#\n#       Run Query:  Ctrl-Enter (or press the play button above)\n#\n#   Auto Complete:  Ctrl-Space (or just start typing)\n#\n{\n  permissions {\n    datahash\n    owner\n    viewer\n  }\n}\n',
         variables: null,
         operationName: null },
      json: true };

    request(options, function (error, response, {data}) {
      if (error) throw new Error(error);
      dispatch({ type: GET_COLLECTIONS_SUCCESS, data: data.permissions })
    });
  } catch (err) {
    dispatch({ type: GET_COLLECTIONS_FAILURE, err })
  }
}
