import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Date` scalar represents an ISO-8601 compliant date type. */
  Date: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type Artist = {
  __typename?: 'Artist';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  releases: Array<Release>;
  songArtists: Array<SongArtist>;
  songsOnFeat: Array<Song>;
};

export type ArtistFilterInput = {
  and?: InputMaybe<Array<ArtistFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ArtistFilterInput>>;
  releases?: InputMaybe<ListFilterInputTypeOfReleaseFilterInput>;
  songArtists?: InputMaybe<ListFilterInputTypeOfSongArtistFilterInput>;
  songsOnFeat?: InputMaybe<ListFilterInputTypeOfSongFilterInput>;
};

export type ArtistSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ArtistsConnection = {
  __typename?: 'ArtistsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ArtistsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Artist>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ArtistsEdge = {
  __typename?: 'ArtistsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Artist;
};

export type DateOperationFilterInput = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
  ngt?: InputMaybe<Scalars['Date']['input']>;
  ngte?: InputMaybe<Scalars['Date']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  nlt?: InputMaybe<Scalars['Date']['input']>;
  nlte?: InputMaybe<Scalars['Date']['input']>;
};

export type Endpoint = {
  __typename?: 'Endpoint';
  artists?: Maybe<ArtistsConnection>;
  genres?: Maybe<GenresConnection>;
  releases?: Maybe<ReleasesConnection>;
  songs?: Maybe<SongsConnection>;
  users?: Maybe<UsersConnection>;
};


export type EndpointArtistsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ArtistSortInput>>;
  where?: InputMaybe<ArtistFilterInput>;
};


export type EndpointGenresArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<GenreSortInput>>;
  where?: InputMaybe<GenreFilterInput>;
};


export type EndpointReleasesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ReleaseSortInput>>;
  where?: InputMaybe<ReleaseFilterInput>;
};


export type EndpointSongsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SongSortInput>>;
  where?: InputMaybe<SongFilterInput>;
};


export type EndpointUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  songs: Array<Song>;
};

export type GenreFilterInput = {
  and?: InputMaybe<Array<GenreFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<GenreFilterInput>>;
  songs?: InputMaybe<ListFilterInputTypeOfSongFilterInput>;
};

export type GenreSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type GenresConnection = {
  __typename?: 'GenresConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GenresEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Genre>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type GenresEdge = {
  __typename?: 'GenresEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Genre;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ListFilterInputTypeOfArtistFilterInput = {
  all?: InputMaybe<ArtistFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ArtistFilterInput>;
  some?: InputMaybe<ArtistFilterInput>;
};

export type ListFilterInputTypeOfReleaseFilterInput = {
  all?: InputMaybe<ReleaseFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReleaseFilterInput>;
  some?: InputMaybe<ReleaseFilterInput>;
};

export type ListFilterInputTypeOfSongArtistFilterInput = {
  all?: InputMaybe<SongArtistFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SongArtistFilterInput>;
  some?: InputMaybe<SongArtistFilterInput>;
};

export type ListFilterInputTypeOfSongFilterInput = {
  all?: InputMaybe<SongFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SongFilterInput>;
  some?: InputMaybe<SongFilterInput>;
};

export type ListFilterInputTypeOfSongUserFilterInput = {
  all?: InputMaybe<SongUserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SongUserFilterInput>;
  some?: InputMaybe<SongUserFilterInput>;
};

export type ListFilterInputTypeOfUserFilterInput = {
  all?: InputMaybe<UserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UserFilterInput>;
  some?: InputMaybe<UserFilterInput>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Release = {
  __typename?: 'Release';
  author: Artist;
  authorId: Scalars['UUID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  linkToCover: Scalars['String']['output'];
  name: Scalars['String']['output'];
  releaseDate: Scalars['Date']['output'];
  songs: Array<Song>;
  type: ReleaseType;
  typeId: Scalars['Int']['output'];
};

export type ReleaseFilterInput = {
  and?: InputMaybe<Array<ReleaseFilterInput>>;
  author?: InputMaybe<ArtistFilterInput>;
  authorId?: InputMaybe<UuidOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  linkToCover?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ReleaseFilterInput>>;
  releaseDate?: InputMaybe<DateOperationFilterInput>;
  songs?: InputMaybe<ListFilterInputTypeOfSongFilterInput>;
  type?: InputMaybe<ReleaseTypeFilterInput>;
  typeId?: InputMaybe<IntOperationFilterInput>;
};

export type ReleaseSortInput = {
  author?: InputMaybe<ArtistSortInput>;
  authorId?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  linkToCover?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  releaseDate?: InputMaybe<SortEnumType>;
  type?: InputMaybe<ReleaseTypeSortInput>;
  typeId?: InputMaybe<SortEnumType>;
};

export enum ReleaseType {
  Album = 'ALBUM',
  Mixtape = 'MIXTAPE',
  Single = 'SINGLE'
}

export type ReleaseTypeFilterInput = {
  and?: InputMaybe<Array<ReleaseTypeFilterInput>>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ReleaseTypeFilterInput>>;
  releases?: InputMaybe<ListFilterInputTypeOfReleaseFilterInput>;
  value?: InputMaybe<IntOperationFilterInput>;
};

export type ReleaseTypeSortInput = {
  name?: InputMaybe<SortEnumType>;
  value?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ReleasesConnection = {
  __typename?: 'ReleasesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ReleasesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Release>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ReleasesEdge = {
  __typename?: 'ReleasesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Release;
};

export enum Role {
  Admin = 'ADMIN',
  Databaseadmin = 'DATABASEADMIN',
  Default = 'DEFAULT'
}

export type RoleFilterInput = {
  and?: InputMaybe<Array<RoleFilterInput>>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoleFilterInput>>;
  users?: InputMaybe<ListFilterInputTypeOfUserFilterInput>;
  value?: InputMaybe<IntOperationFilterInput>;
};

export type RoleSortInput = {
  name?: InputMaybe<SortEnumType>;
  value?: InputMaybe<SortEnumType>;
};

export type Song = {
  __typename?: 'Song';
  artistsOnFeat: Array<Artist>;
  audioLink: Scalars['String']['output'];
  genre: Genre;
  genreId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  release: Release;
  releaseId: Scalars['UUID']['output'];
  songArtists: Array<SongArtist>;
  songUsers: Array<SongUser>;
  usersWhoAdded: Array<User>;
};

export type SongArtist = {
  __typename?: 'SongArtist';
  artist: Artist;
  artistId: Scalars['UUID']['output'];
  song: Song;
  songId: Scalars['UUID']['output'];
};

export type SongArtistFilterInput = {
  and?: InputMaybe<Array<SongArtistFilterInput>>;
  artist?: InputMaybe<ArtistFilterInput>;
  artistId?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<SongArtistFilterInput>>;
  song?: InputMaybe<SongFilterInput>;
  songId?: InputMaybe<UuidOperationFilterInput>;
};

export type SongFilterInput = {
  and?: InputMaybe<Array<SongFilterInput>>;
  artistsOnFeat?: InputMaybe<ListFilterInputTypeOfArtistFilterInput>;
  audioLink?: InputMaybe<StringOperationFilterInput>;
  genre?: InputMaybe<GenreFilterInput>;
  genreId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SongFilterInput>>;
  release?: InputMaybe<ReleaseFilterInput>;
  releaseId?: InputMaybe<UuidOperationFilterInput>;
  songArtists?: InputMaybe<ListFilterInputTypeOfSongArtistFilterInput>;
  songUsers?: InputMaybe<ListFilterInputTypeOfSongUserFilterInput>;
  usersWhoAdded?: InputMaybe<ListFilterInputTypeOfUserFilterInput>;
};

export type SongSortInput = {
  audioLink?: InputMaybe<SortEnumType>;
  genre?: InputMaybe<GenreSortInput>;
  genreId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  release?: InputMaybe<ReleaseSortInput>;
  releaseId?: InputMaybe<SortEnumType>;
};

export type SongUser = {
  __typename?: 'SongUser';
  song: Song;
  songId: Scalars['UUID']['output'];
  user: User;
  userId: Scalars['UUID']['output'];
};

export type SongUserFilterInput = {
  and?: InputMaybe<Array<SongUserFilterInput>>;
  or?: InputMaybe<Array<SongUserFilterInput>>;
  song?: InputMaybe<SongFilterInput>;
  songId?: InputMaybe<UuidOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

/** A connection to a list of items. */
export type SongsConnection = {
  __typename?: 'SongsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SongsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Song>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SongsEdge = {
  __typename?: 'SongsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Song;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  favouriteSongs: Array<Song>;
  id: Scalars['UUID']['output'];
  role: Role;
  roleId: Scalars['Int']['output'];
  songUsers: Array<SongUser>;
  username: Scalars['String']['output'];
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  favouriteSongs?: InputMaybe<ListFilterInputTypeOfSongFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  password?: InputMaybe<StringOperationFilterInput>;
  role?: InputMaybe<RoleFilterInput>;
  roleId?: InputMaybe<IntOperationFilterInput>;
  songUsers?: InputMaybe<ListFilterInputTypeOfSongUserFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
};

export type UserSortInput = {
  email?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  password?: InputMaybe<SortEnumType>;
  role?: InputMaybe<RoleSortInput>;
  roleId?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: User;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type UsersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;


export type UsersQuery = { __typename?: 'Endpoint', users?: { __typename?: 'UsersConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges?: Array<{ __typename?: 'UsersEdge', cursor: string, node: { __typename?: 'User', id: any, username: string, email: string, role: Role } }> | null } | null };

export const UsersDocument = gql`
    query Users($first: Int, $last: Int, $after: String, $before: String) {
  users(first: $first, last: $last, after: $after, before: $before) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        username
        email
        role
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    override document = UsersDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
