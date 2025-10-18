ARG SDK_VERSION=9.0

# Base Stage
FROM mcr.microsoft.com/dotnet/sdk:${SDK_VERSION} AS base

ARG API_DIR=./server/Api
ARG HTTP_PORT=80
ARG HTTPS_PORT=443

WORKDIR /app
COPY ${API_DIR}/*.csproj ./
RUN dotnet restore
COPY ${API_DIR} .
EXPOSE 80
EXPOSE 443
ENV ASPNETCORE_URLS=http://+:${HTTP_PORT};https://+:${HTTPS_PORT}

# Development Target
FROM base AS development
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "watch", "run"]
CMD ["--no-restore", "--non-interactive"]

# Production Build Stage
FROM base AS prod-builder
RUN dotnet publish -c Release -o ./publish --no-restore

# Production Stage
FROM mcr.microsoft.com/dotnet/aspnet:${SDK_VERSION} AS production
WORKDIR /app
COPY --from=prod-builder /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "Webbl.Api.dll"]
