require 'gpgme'

module JBoss
  module Developer
    class Vault

      def initialize filename: nil
        @crypto = GPGME::Crypto.new
        @filename = filename
      end

      def execute site
        if site.secrets.nil?
          begin
            fname = File.open @filename || Pathname.new(site.config.config_dir).join('secrets.yaml.gpg').to_s
            site.secrets = YAML.load(@crypto.decrypt(fname).to_s)
            site.secrets.each do |k, v|
              ENV[k] = v
            end
          rescue GPGME::Error => e
            puts "Unable to decrypt vault (#{e})"
          end
        end
      end

    end
  end
end

