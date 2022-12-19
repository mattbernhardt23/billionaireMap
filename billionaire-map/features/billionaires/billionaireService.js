import axios from "axios";
import countryCoordinates from "@utils/countryCoordinates";

// const API_URL = '/api/billionaires/'
const API_URL = "/api/billionaires";

// Get Billionaires By Country
const getBillionaires = async (country) => {
  const options = {
    params: { country: country },
  };

  const response = await axios.get(API_URL, options);

  return response.data.billionaires;
};

// Set Country
const setViewState = (viewport) => {
  return viewport;
};

const getBillionaire = (billionaire) => {
  return billionaire;
};

const COMMENT_URL = "/api/billionaires/:id/comments";

const createComment = async (comment) => {
  const options = {
    params: {
      billionaire: comment.billionaire,
      comment: {
        body: comment.body,
        name: comment.user.name,
        author: comment.user,
      },
    },
  };

  const response = await axios.post(COMMENT_URL, options);

  return response.data;
};

const deleteComment = async (commentData) => {
  const URL = COMMENT_URL + "/" + commentData.commentId;

  const options = {
    params: {
      commentId: commentData.commentId,
      id: commentData.id,
    },
  };

  const response = await axios.delete(URL, options);

  return response.data;
};

const billionaireService = {
  getBillionaires,
  setViewState,
  getBillionaire,
  createComment,
  deleteComment,
};

export default billionaireService;
