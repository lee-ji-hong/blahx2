import { NextApiRequest, NextApiResponse } from 'next';
import validateParamWithData from '../req_validator';
import BadReqError from '../custom_error/bad_req_error';
import { CreateInstantEventReq } from './interface/CreateInstantEventReq';
import JSCCreateInstantEventReq from './JSONSchema/JSCCreateInstantEventReq';
import InstantMessageModel from '@/models/instant_message/instant_msg.model';
import JSCGetInstantEventReq from './JSONSchema/JSCGetInstantEventReq';
import { GetInstantEventReq } from './interface/GetInstantEventReq';
import { PostInstantEventMessageReq } from './interface/PostInstantEventMessageReq';
import JSCPostInstantEventMessageReq from './JSONSchema/JSCPostInstantEventMessageReq';
import JSCInstantEventMessageListReq from './JSONSchema/JSCInstantEventMessageListReq';
import JSCInstantEventMessageInfoReq from './JSONSchema/JSCInstantEventMessageInfoReq';
import JSCPostInstantEventMessageReplyReq from './JSONSchema/JSCPostInstantEventMessageReplyReq';
import JSCFindAllInstantEventReq from './JSONSchema/JSCFindAllInstantEventReq';

async function create(req: NextApiRequest, res: NextApiResponse) {
  const validateResp = validateParamWithData<CreateInstantEventReq>(
    {
      body: req.body,
    },
    JSCCreateInstantEventReq,
  );
  if (validateResp.result === false) {
    throw new BadReqError(validateResp.errorMessage);
  }

  const { uid, title, desc, startDate, endDate } = validateResp.data.body;
  const id = await InstantMessageModel.create({ uid, title, desc, startDate, endDate });
  return res.status(201).json({ instantEventId: id });
}

async function findAllEvent(req: NextApiRequest, res: NextApiResponse) {
  const validateResp = validateParamWithData<{ query: { uid: string } }>(
    {
      query: req.query,
    },
    JSCFindAllInstantEventReq,
  );
  if (validateResp.result === false) {
    throw new BadReqError(validateResp.errorMessage);
  }
  const { uid } = validateResp.data.query;
  const instantEventInfo = await InstantMessageModel.findAllEvent({ uid });
  return res.status(200).json(instantEventInfo);
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const validateResp = validateParamWithData<GetInstantEventReq>(
    {
      query: req.query,
    },
    JSCGetInstantEventReq,
  );
  if (validateResp.result === false) {
    throw new BadReqError(validateResp.errorMessage);
  }
  const { uid, instantEventId } = validateResp.data.query;
  const instantEventInfo = await InstantMessageModel.get({ uid, instantEventId });
  return res.status(200).json(instantEventInfo);
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const validateResp = validateParamWithData<PostInstantEventMessageReq>(
    {
      body: req.body,
    },
    JSCPostInstantEventMessageReq,
  );
  if (validateResp.result === false) {
    throw new BadReqError(validateResp.errorMessage);
  }
  await InstantMessageModel.post({ ...validateResp.data.body });
  return res.status(201).end();
}

async function messageList(req: NextApiRequest, res: NextApiResponse) {
  const validateResp = validateParamWithData<{
    query: {
      uid: string;
      instantEventId: string;
    };
  }>(
    {
      query: req.query,
    },
    JSCInstantEventMessageListReq,
  );
  if (validateResp.result === false) {
    throw new BadReqError(validateResp.errorMessage);
  }
  const result = await InstantMessageModel.messageList({ ...validateResp.data.query });
  return res.status(200).json(result);
}

async function getMessageInfo(req: NextApiRequest, res: NextApiResponse) {
  const validateResp = validateParamWithData<{
    query: {
      uid: string;
      instantEventId: string;
      messageId: string;
    };
  }>(
    {
      query: req.query,
    },
    JSCInstantEventMessageInfoReq,
  );
  if (validateResp.result === false) {
    throw new BadReqError(validateResp.errorMessage);
  }
  const result = await InstantMessageModel.messageInfo({ ...validateResp.data.query });
  return res.status(200).json(result);
}

async function postReply(req: NextApiRequest, res: NextApiResponse) {
  const validateResp = validateParamWithData<{
    query: {
      uid: string;
      instantEventId: string;
      messageId: string;
    };
    body: {
      reply: string;
      author?: {
        displayName: string;
        photoURL?: string;
      };
    };
  }>(
    {
      query: req.query,
      body: req.body,
    },
    JSCPostInstantEventMessageReplyReq,
  );
  if (validateResp.result === false) {
    throw new BadReqError(validateResp.errorMessage);
  }
  await InstantMessageModel.postReply({ ...validateResp.data.query, ...validateResp.data.body });
  return res.status(200).end();
}

const InstantMessageCtrl = {
  findAllEvent,
  create,
  get,
  post,
  messageList,
  getMessageInfo,
  postReply,
};

export default InstantMessageCtrl;
