PGDMP                         x            Fang-s-Noodles    13.1    13.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16407    Fang-s-Noodles    DATABASE     l   CREATE DATABASE "Fang-s-Noodles" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';
     DROP DATABASE "Fang-s-Noodles";
                postgres    false            �            1259    16419    admin    TABLE     G   CREATE TABLE public.admin (
    id text NOT NULL,
    password text
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    16456    reservation    TABLE     �   CREATE TABLE public.reservation (
    id integer NOT NULL,
    date date,
    personnes integer,
    client integer NOT NULL,
    heure text
);
    DROP TABLE public.reservation;
       public         heap    postgres    false            �            1259    16454    reservation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reservation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.reservation_id_seq;
       public          postgres    false    204            �           0    0    reservation_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.reservation_id_seq OWNED BY public.reservation.id;
          public          postgres    false    203            �            1259    16410    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    email text,
    password text,
    nom text,
    prenom text,
    telephone character(14)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16408    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    201            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            0           2604    16459    reservation id    DEFAULT     p   ALTER TABLE ONLY public.reservation ALTER COLUMN id SET DEFAULT nextval('public.reservation_id_seq'::regclass);
 =   ALTER TABLE public.reservation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    204    204            /           2604    16413    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            �          0    16419    admin 
   TABLE DATA           -   COPY public.admin (id, password) FROM stdin;
    public          postgres    false    202   �       �          0    16456    reservation 
   TABLE DATA           I   COPY public.reservation (id, date, personnes, client, heure) FROM stdin;
    public          postgres    false    204   H       �          0    16410    users 
   TABLE DATA           L   COPY public.users (id, email, password, nom, prenom, telephone) FROM stdin;
    public          postgres    false    201   �       �           0    0    reservation_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.reservation_id_seq', 40, true);
          public          postgres    false    203            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 10, true);
          public          postgres    false    200            4           2606    16426    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    202            6           2606    16461    reservation reservation_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.reservation DROP CONSTRAINT reservation_pkey;
       public            postgres    false    204            2           2606    16418    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            �   k   x�KL�����JL.,M-�-I���L-�MM+J͌7202�T1JR14P))�p�sw��6�+��I2(15ӫ��r���2�
��,�*OMr*3,�puM��/t�w������ m      �   H   x�e���0ѳ���]�����
��\�Fs����M����Ĺ�s�:�_݋����zVvH_����� �_      �   �   x�e͹�@�zy
��؉1����p�n@pq�U��5A�)���Fp&���=Y����!�H5��j���iem���lH��e.�G,"�m�y5(f���W.�6Lb%ZuZ||�����T��UB��e���\O<?u��v�Z���u"`gF;^��P�.��$��;�;��p������{Ċ�� M     