import { StatusEnum } from '@tsailab/core-types';

/**
 * @property group from dict
 * @property type will agent/chatbot/knowledge
 * @property bind knowledge id
 */
export interface PETemplate {
  id: number;
  uuid: number;
  title: string;
  systemRole?: string;
  prefixMessages?: string;
  suffixMessages?: string;
  sortno: number;
  status: StatusEnum;
  group: string;
  type: string;
  remark: string;
  knowledgeId?: string;
  models: PETemplateOption[];
}

/**
 * @tsailab/loto-types
 * provider reffer AiProviderEnum
 * modelid is unique id in xai economic
 * model is llm api model
 * aiopts the model extra options
 * @property propertyNames [top_n,max.token]
 *  when max.token will check input max is object and
 *  contains token
 */
export interface PETemplateOption {
  id: number;
  uuid: number;
  modelid: string;
  provider: string;
  model: string;
  aiopts?: Record<string, any>;
  propertyNames?: string[];
  version?: string;
  baseUrl?: string;
  sortno: number;
  status: StatusEnum;
  remark?: string;
}
