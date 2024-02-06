CREATE TABLE [Orders] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (50)  NOT NULL,
    [PhoneNumber] NVARCHAR (MAX) NOT NULL,
    [Address]     NVARCHAR (25)  NOT NULL,
    [Pizza]       NVARCHAR (MAX) NOT NULL,
    [Note]        NVARCHAR (200) NOT NULL,
    [Count]       INT            NOT NULL,
    [IsDelivered] BIT            DEFAULT (CONVERT([bit],(0))) NOT NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id] ASC)
);
