import config from "@payload-config";
import { getPayload as _getPayload } from "payload";
import { cache } from "react";

export const getPayload = cache(() => _getPayload({ config }));
