
import type { Role } from "../../../types/interfaces";
import { apiClient } from "../../api/api-client";
import { ENDPOINTS } from "../../api/end-point";
import { nestPermissions, flattenPermissions } from "../../flat-permission";




export const roleService = {

  getAll: async () => {
    try {
      const res = await apiClient.get(ENDPOINTS.ROLES);
      const data = Array.isArray(res.data) ? res.data : [];

      const uniqueMap = new Map();
      data.forEach((item) => {
        if (!uniqueMap.has(item.roleName)) {
          uniqueMap.set(item.roleName, item);
        }
      });

      return Array.from(uniqueMap.values()).map((item) => ({
        ...item,
        permissions: nestPermissions(item),
      }));
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      return [];
    }
  },

  getById: async (id:string) => {
    try {
      const res = await apiClient.get(`${ENDPOINTS.ROLES}/${id}`);
      if (!res.data) return null;

      return {
        ...res.data,
        permissions: nestPermissions(res.data),
      };
    } catch (error) {
      console.error(`Failed to fetch role with id ${id}:`, error);
      return null;
    }
  },

 
  create: async (data:Role) => {
    try {
      const flatData = {
        ...data,
        ...flattenPermissions(data.permissions),
      };
      delete flatData.permissions;

      const res = await apiClient.post(ENDPOINTS.ROLES, flatData);
      return res.data;
    } catch (error) {
      console.error("Failed to create role:", error);
      return null;
    }
  },


  update: async (id:string, data:Role) => {
    try {
      const flatData = {
        ...data,
        ...flattenPermissions(data.permissions),
      };
      delete flatData.permissions;

      const res = await apiClient.put(`${ENDPOINTS.ROLES}/${id}`, flatData);
      return res.data;
    } catch (error) {
      console.error(`Failed to update role with id ${id}:`, error);
      return null;
    }
  },

  delete: async (id:string) => {
    try {
      await apiClient.delete(`${ENDPOINTS.ROLES}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete role with id ${id}:`, error);
      return false;
    }
  },

 
  getUsersByRole: async (roleName) => {
    try {
      const res = await apiClient.get(
        `${ENDPOINTS.USER}?role=${encodeURIComponent(roleName)}`
      );
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error(`Failed to fetch users for role ${roleName}:`, error);
      return [];
    }
  },
};

