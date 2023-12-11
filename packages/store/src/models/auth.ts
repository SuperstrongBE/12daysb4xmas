import ConnectWallet, { type ProtonWebLink, type LinkSession, type Link } from "@proton/web-sdk";
import { action, thunk, type Action, type Thunk } from "easy-peasy";


  

//TODO: Check if type not exist from the API
export interface ProtonProfile {
    avatar:string,
    userName:string
}

//TODO following will be replaced by prisma user


export interface AuthModel {
    data:{
        link:ProtonWebLink | Link | null | undefined;
        session:LinkSession  | null | undefined;
        protonProfile:ProtonProfile | null;

    };
    setLink:Action<AuthModel,ProtonWebLink | Link |  undefined>;
    setSession:Action<AuthModel,LinkSession | undefined >;
    setProtonProfile:Action<AuthModel,ProtonProfile>;

    connect:Thunk<AuthModel,void>;
    disconnect:Thunk<AuthModel,void>;
    authorize:Thunk<AuthModel,string>;
    fetchProtonProfile:Thunk<AuthModel,string>;
    updateAuth:Thunk<AuthModel,LinkSession>;

}



export interface AuthModelConfiguration {

    protonEndpoints:string[]

}

export function configureAuthModel(config: AuthModelConfiguration): AuthModel {
    
    const authModel: AuthModel = {
        data: {
            link: null,
            session: null,
            protonProfile: null
        },
        setLink: action((state, protonWebLink) => {
            state.data.link = protonWebLink;
        }),
        setSession: action((state, linkSession) => {
            state.data.session = linkSession;
        }),
        
        setProtonProfile: action((state, protonProfile) => {
            state.data.protonProfile = protonProfile
        }),
        connect: thunk(async (actions) => {
            actions
            const { session, link } = await ConnectWallet({
                linkOptions: {
                    //TODO add a better way to inject endpoint
                    endpoints: config.protonEndpoints
                    ,
                },
    
            })
            actions.setLink(link)
            actions.setSession(session)
        }),
        //TODO: Mark as async when implement
        disconnect: thunk((actions) => {
            actions
        }),
        //TODO: Mark as async when implement
        authorize: thunk((actions) => {
            actions
        }),
        fetchProtonProfile: thunk((actions) => {
            actions
        }),
        //TODO: Mark as async when implement
        updateAuth: thunk((actions) => {
            actions
        })
    }
    
    return authModel;
    
}