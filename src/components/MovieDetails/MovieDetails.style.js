import styled from 'styled-components';

export const BigDiv = styled.div`
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
`;

export const Poster = styled.img`
  display: block;
  margin-right: 20px;
`;

export const GenresList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

export const GenresItem = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const AdditionalDiv = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
`;
