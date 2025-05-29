"use client";

import {
  company_member_table,
  company_referral_link_table,
  user_table,
} from "@/generated/companyMithril";
import { createContext, ReactNode, useContext, useState } from "react";

type RoleContextType = {
  teamMemberProfile: company_member_table & user_table;
  setTeamMemberProfile: ({
    teamMemberProfile,
  }: {
    teamMemberProfile: company_member_table & user_table;
  }) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({
  children,
  initialTeamMemberProfile,
}: {
  children: ReactNode;
  initialTeamMemberProfile: company_member_table & user_table;
}) => {
  const [state, setState] = useState({
    teamMemberProfile: initialTeamMemberProfile,
  });

  const setProfile = ({ profile }: { profile: user_table }) => {
    setState((prev) => ({ ...prev, profile }));
  };

  const setTeamMemberProfile = ({
    teamMemberProfile,
  }: {
    teamMemberProfile: company_member_table & user_table;
  }) => {
    setState((prev) => ({
      ...prev,
      teamMemberProfile,
    }));
  };

  const setReferral = ({
    referral,
  }: {
    referral: company_referral_link_table;
  }) => {
    setState((prev) => ({
      ...prev,
      referral,
    }));
  };

  return (
    <RoleContext.Provider
      value={{
        teamMemberProfile: state.teamMemberProfile,
        setTeamMemberProfile,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within a RoleProvider");
  return context;
};
